import { createReducer } from '@reduxjs/toolkit';
import { currentUser, signin, signout, signup } from '../actions/auth-actions';
import { RequestError } from '../actions/request-errors';

export interface CurrentUser {
  id: string;
  username: string;
}

interface AuthState {
  user: CurrentUser | null;
  didSigninFail: boolean;
  didSignupFail: boolean;
  isSignedin: boolean;
  errors: RequestError[];
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  didSigninFail: false,
  didSignupFail: false,
  isSignedin: false,
  accessToken: null,
  errors: [],
};

const authReducer = createReducer(initialState, builder =>
  builder
    .addCase(signup.fulfilled, (state, { payload }) => {
      return {
        ...state,
        didSignupFail: false,
        isSignedin: true,
        ...payload,
      };
    })
    .addCase(signup.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          didSignupFail: true,
          errors: action.payload.errors,
        };
      }
    })
    .addCase(signin.fulfilled, (state, { payload }) => {
      return {
        ...state,
        didSigninFail: false,
        isSignedin: true,
        ...payload,
      };
    })
    .addCase(signin.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          didSigninFail: true,
          errors: action.payload.errors,
        };
      }
    })
    .addCase(currentUser.fulfilled, (state, { payload }) => {
      return { ...state, isSignedin: true, currentUser: payload };
    })
    .addCase(currentUser.rejected, () => {
      return initialState;
    })
    .addCase(signout.fulfilled, () => {
      return initialState;
    })
    .addCase(signout.rejected, () => {
      return initialState;
    }),
);

export default authReducer;
