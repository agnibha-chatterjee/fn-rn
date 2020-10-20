import { createDataContext } from './create-data-context';
import { LOCATION_AND_ADDRESS_CHANGE, REGISTER_USER } from './types';

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
  { registerUser, updateLocationAndAddress },
  {}
);
