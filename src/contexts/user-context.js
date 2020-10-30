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
