import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from '../actions/types';

const initialState = {
  currentUser: null,
  didSigninFail: false,
  didSignupFail: false,
  isSignedin: false,
  errors: [],
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_FAILED:
      return { ...state, didSigninFail: true, ...payload };
    case SIGNIN_SUCCESS:
      return { ...state, didSigninFail: false, ...payload };
    case SIGNUP_FAILED:
      return { ...state, didSignupFail: true, ...payload };
    case SIGNUP_SUCCESS:
      return { ...state, didSignupFail: false, ...payload };
    case SIGNOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
