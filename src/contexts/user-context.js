import { createDataContext } from './create-data-context';
import { userReducer } from './reducers/user-reducer';
import {
  registerUser,
  updateLocationAndAddress,
  OTPSignin,
  signOut,
  checkAuthState,
  updateProfile,
  updateSearchRadius,
} from './actions/user-actions';

export const { Context, Provider } = createDataContext(
  userReducer,
  {
    registerUser,
    updateLocationAndAddress,
    OTPSignin,
    signOut,
    checkAuthState,
    updateProfile,
    updateSearchRadius,
  },
  {
    errors: {},
    isAlreadySignedIn: false,
    registered: true,
  }
);
