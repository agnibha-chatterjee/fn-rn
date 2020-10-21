import { createDataContext } from './create-data-context';
import {
  CHECK_AUTH_STATE,
  LOCATION_AND_ADDRESS_CHANGE,
  OTP_SIGNIN,
  REGISTER_USER,
  SIGNOUT,
} from './types';
import firebase from '../config/firebase-config';
import axios from '../config/axios';

const reducer = (state, action) => {
  switch (action.type) {
    case CHECK_AUTH_STATE:
      return action.payload
        ? {
            ...state,
            authenticated: true,
            _id: action.payload.uid,
            contactNumber: action.payload.phoneNumber,
            registered: action.payload.registered,
          }
        : state;
    case OTP_SIGNIN:
      console.log(action.payload);
      return { ...state, authenticated: true, ...action.payload };
    case REGISTER_USER: {
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        registered: true,
      };
    }
    case LOCATION_AND_ADDRESS_CHANGE:
      return {
        ...state,
        address: action.payload.address,
        defaultLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };
    case SIGNOUT:
      return { authenticated: false, registered: false };
    default:
      return state;
  }
};

//Auth
const checkAuthState = (dispatch) => async (user) => {
  try {
    let registered;
    const res = await axios.get(`/users/${user.uid}`);
    console.log('FROM CHECK AUTH', res);
    if (res.data.username) {
      registered = true;
    }
    dispatch({
      type: CHECK_AUTH_STATE,
      payload: { ...user, registered },
    });
  } catch (error) {}
};

const OTPSignin = (dispatch) => async (firebaseUserData, cb) => {
  try {
    const res = await axios.post('/users/login', { ...firebaseUserData });
    console.log(res);
    dispatch({
      type: OTP_SIGNIN,
      payload: {
        ...firebaseUserData,
        registered: res.data.user.username ? true : false,
        isAlreadySignedIn: res.data.isAlreadySignedIn,
      },
    });
    if (cb) cb();
  } catch (error) {
    console.log(error);
  }
};

const signOut = (dispatch) => async (_id) => {
  try {
    await firebase.auth().signOut();
    await axios.post('/users/logout', { _id });
    dispatch({
      type: SIGNOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

// Registration
const registerUser = (dispatch) => async (userData) => {
  try {
    const res = await axios.post('/users/register', { ...userData });
    dispatch({
      type: REGISTER_USER,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateLocationAndAddress = (dispatch) => (address, location) => {
  dispatch({
    type: LOCATION_AND_ADDRESS_CHANGE,
    payload: {
      latitude: location.latitude,
      longitude: location.longitude,
      address,
    },
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    registerUser,
    updateLocationAndAddress,
    OTPSignin,
    signOut,
    checkAuthState,
  },
  { authenticated: false, registered: false }
);
