import {
  CHECK_AUTH_STATE,
  LOCATION_AND_ADDRESS_CHANGE,
  OTP_SIGNIN,
  OTP_SIGNIN_ERROR,
  REGISTER_USER,
  SIGNOUT,
  UPDATE_USER_PROFILE,
  SEARCH_RADIUS_CHANGE,
  SIGNOUT_ERROR,
} from './types';
import firebase from '../../config/firebase-config';
import axios from '../../config/axios';
import { Alert } from 'react-native';

//Auth
export const checkAuthState = (dispatch) => async (user) => {
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

export const OTPSignin = (dispatch) => async (firebaseUserData, cb) => {
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
    Alert.alert(
      'This phone number is already in use. Please try again with a different phone number'
    );
  }
};

export const signOut = (dispatch) => async (_id) => {
  try {
    await firebase.auth().signOut();
    await axios.post('/users/logout', { _id });
    dispatch({
      type: SIGNOUT,
    });
  } catch (error) {
    dispatch({
      type: SIGNOUT_ERROR,
    });
    Alert.alert("We're having some trouble signing you out! Hold on.");
  }
};

// Registration
export const registerUser = (dispatch) => async (userData) => {
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

export const updateLocationAndAddress = (dispatch) => (
  address,
  location,
  cb
) => {
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

export const updateSearchRadius = (dispatch) => (searchRadius) => {
  dispatch({
    type: SEARCH_RADIUS_CHANGE,
    payload: searchRadius,
  });
};

export const updateProfile = (dispatch) => async (userData) => {
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
