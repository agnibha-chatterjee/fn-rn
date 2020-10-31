import {
  REGISTER_USER,
  CHECK_AUTH_STATE,
  LOCATION_AND_ADDRESS_CHANGE,
  OTP_SIGNIN,
  OTP_SIGNIN_ERROR,
  SEARCH_RADIUS_CHANGE,
  SIGNOUT,
  SIGNOUT_ERROR,
  UPDATE_USER_PROFILE,
  CUSTOM_REQUEST_LOCATION,
} from '../actions/types';

export const userReducer = (state, action) => {
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
    case CUSTOM_REQUEST_LOCATION:
      return {
        ...state,
        customAddress: action.payload.address,
        customLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    case SEARCH_RADIUS_CHANGE:
      return {
        ...state,
        defaultSearchRadius: action.payload,
      };
    case SIGNOUT:
      return { authenticated: false, registered: false };
    case SIGNOUT_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          signout_error: "We're having some trouble signing you out! Hold on.",
        },
      };
    default:
      return state;
  }
};
