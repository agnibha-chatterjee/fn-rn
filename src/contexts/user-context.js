import { createDataContext } from './create-data-context';
import {
  CHECK_AUTH_STATE,
  LOCATION_AND_ADDRESS_CHANGE,
  OTP_SIGNIN,
  REGISTER_USER,
  SIGNOUT,
} from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return { ...state, ...action.payload };
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
    default:
      return state;
  }
};

//Auth
const checkAuthState = (dispatch) => () => {
  dispatch({
    type: CHECK_AUTH_STATE,
  });
};

const OTPSignin = (dispatch) => (firebaseUserData) => {
  dispatch({
    type: OTP_SIGNIN,
    payload: firebaseUserData,
  });
};

const signOut = (dispatch) => () => {
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
  {}
);
