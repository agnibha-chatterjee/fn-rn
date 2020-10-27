import { createDataContext } from './create-data-context';
import {
  CHECK_AUTH_STATE,
  LOCATION_AND_ADDRESS_CHANGE,
  OTP_SIGNIN,
  OTP_SIGNIN_ERROR,
  REGISTER_USER,
  SIGNOUT,
  UPDATE_USER_PROFILE,
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
      return { ...state, authenticated: true, ...action.payload };
    case OTP_SIGNIN_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          duplicate_number: 'Phone number is already in use',
        },
      };
    case REGISTER_USER: {
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        registered: true,
      };
    }
    case UPDATE_USER_PROFILE:
      return { ...state, ...action.payload };
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
    if (res.data.username) {
      registered = true;
    }
    dispatch({
      type: CHECK_AUTH_STATE,
      payload: { ...user, registered, ...res.data },
    });
  } catch (error) {}
};

const OTPSignin = (dispatch) => async (firebaseUserData, cb) => {
  try {
    const res = await axios.post('/users/login', { ...firebaseUserData });
    dispatch({
      type: OTP_SIGNIN,
      payload: {
        ...firebaseUserData,
        registered: res.data.user.username ? true : false,
        isAlreadySignedIn: res.data.isAlreadySignedIn,
        ...res.data.user,
      },
    });
    if (cb) cb();
  } catch (error) {
    dispatch({
      type: OTP_SIGNIN_ERROR,
    });
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
    console.log(userData);
    dispatch({
      type: REGISTER_USER,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateLocationAndAddress = (dispatch) => (address, location, cb) => {
  dispatch({
    type: LOCATION_AND_ADDRESS_CHANGE,
    payload: {
      latitude: location.latitude,
      longitude: location.longitude,
      address,
    },
  });
  if (cb) cb();
};

const updateProfile = (dispatch) => async (userData) => {
  try {
    const res = await axios(`/users/${userData._id}`, {
      method: 'put',
      headers: {
        _id: userData._id,
      },
      data: { ...userData, image: userData.profilePicture },
    });
    dispatch({ type: UPDATE_USER_PROFILE, payload: userData });
  } catch (error) {
    console.log(error);
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    registerUser,
    updateLocationAndAddress,
    OTPSignin,
    signOut,
    checkAuthState,
    updateProfile,
  },
  {
    __v: 0,
    _id: '6qiIuA67WAbAI9oixoNX91Ic9Ci1',
    address: 'Demo address',
    authenticated: true,
    contactNumber: '+919901199218',
    defaultLocation: {
      latitude: 22.495492132177628,
      longitude: 88.36303006857634,
    },
    defaultSearchRadius: 10,
    email: 'aa@aa.com',
    errors: {},
    firstName: 'Agnibha',
    isAlreadySignedIn: false,
    lastModified: '',
    lastName: 'Chatterjee',
    profilePicture: '',
    registered: true,
    username: 'ac_abcd',
    uuid: '6947f9bf-f455-4ecf-b847-f469e932f3e2',
  }
);
