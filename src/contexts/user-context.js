import { createDataContext } from './create-data-context';
import {
  CHECK_AUTH_STATE,
  LOCATION_AND_ADDRESS_CHANGE,
  OTP_SIGNIN,
  REGISTER_USER,
  SIGNOUT,
} from './types';
import firebase from '../config/firebase-config';

const reducer = (state, action) => {
  switch (action.type) {
    case CHECK_AUTH_STATE:
      return action.payload ? { ...state, authenticated: true } : state;
    case OTP_SIGNIN:
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
      return { ...state, authenticated: false };
    default:
      return state;
  }
};

//Auth
const checkAuthState = (dispatch) => (user) => {
  dispatch({
    type: CHECK_AUTH_STATE,
    payload: user,
  });
};

const OTPSignin = (dispatch) => (firebaseUserData, cb) => {
  dispatch({
    type: OTP_SIGNIN,
    payload: firebaseUserData,
  });
  if (cb) cb();
};

const signOut = (dispatch) => async () => {
  console.log('hello');
  await firebase.auth().signOut();
  dispatch({
    type: SIGNOUT,
  });
};

// Registration
const registerUser = (dispatch) => (userData) => {
  dispatch({
    type: REGISTER_USER,
    payload: userData,
  });
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
  { authenticated: true, registered: true }
);
