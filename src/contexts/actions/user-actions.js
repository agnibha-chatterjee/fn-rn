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
  CUSTOM_REQUEST_LOCATION,
} from './types';
import firebase from '../../config/firebase-config';
import axios from '../../config/axios';
import { Alert } from 'react-native';

const registerUserForNotifications = async (userId, token = 'ASDASDASD') => {
  try {
    await axios.post('/notifications/register', {
      userId,
      token,
    });
  } catch (error) {
    console.log('Notification error', error);
  }
};

//Auth
export const checkAuthState = (dispatch) => async (user, cb) => {
  try {
    let registered = false;
    const res = await axios.get(`/users/${user.uid}`, {
      headers: {
        _id: user.uid,
      },
    });
    if (res.data.user.username) {
      registered = true;
    }
    dispatch({
      type: CHECK_AUTH_STATE,
      payload: {
        registered,
        ...res.data.user,
        canChangeName: res.data.canChangeName,
      },
    });
  } catch (error) {}
  if (cb) cb();
  registerUserForNotifications(user.uid);
};

export const OTPSignin = (dispatch) => async (firebaseUserData, cb) => {
  try {
    Alert.alert("Hang on tight! We're signing you in.");
    const res = await axios.post('/users/login', { ...firebaseUserData });
    if (res.data.isAlreadySignedIn) {
      return Alert.alert(
        "Looks like you're already signed into the app. Sign out of any other devices in order to continue"
      );
    }
    dispatch({
      type: OTP_SIGNIN,
      payload: {
        ...firebaseUserData,
        registered: res.data.user.username ? true : false,
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
  registerUserForNotifications(user.uid);
};

export const signOut = (dispatch) => async (_id) => {
  try {
    Alert.alert("Hold on! We're signing you out...");
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
    await axios.post('/users/register', { ...userData });
    dispatch({
      type: REGISTER_USER,
      payload: userData,
    });
    Alert.alert('Welcome aboard!');
  } catch (error) {
    Alert.alert('Problem registering. Try again!');
  }
};

export const updateLocationAndAddress = (dispatch) => (
  type,
  address,
  location,
  cb
) => {
  if (type === 'default') {
    dispatch({
      type: LOCATION_AND_ADDRESS_CHANGE,
      payload: {
        latitude: location.latitude,
        longitude: location.longitude,
        address,
      },
    });
  } else {
    dispatch({
      type: CUSTOM_REQUEST_LOCATION,
      payload: {
        latitude: location.latitude,
        longitude: location.longitude,
        address,
      },
    });
  }
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
      data: userData,
    });
    dispatch({ type: UPDATE_USER_PROFILE, payload: userData });
    if (res.data.error) {
      return Alert.alert(res.data.error);
    }
    return Alert.alert('Successfully updated profile!');
  } catch (error) {
    Alert.alert('Error updating profile. Try again!');
  }
};

export const newRequest = () => async (requestData, cb) => {
  try {
    const res = await axios('/requests', {
      method: 'post',
      headers: {
        _id: requestData._id,
      },
      data: requestData,
    });
    if (res.data.createdAt) {
      Alert.alert('Request was successfully created!');
    }
  } catch (error) {
    Alert.alert('Error! Please try again');
  }
  if (cb) cb();
};
