import {
  SIGNIN_FAILED,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from '../actions/types';
import axios from 'axios';

const SIGNIN_URL = 'ey-chat.com/api/users/signin';
const SIGNUP_URL = 'ey-chat.com/api/users/signup';
const SIGNOUT_URL = 'ey-chat.com/api/users/signout';
const CURRENT_USER_URL = 'ey-chat.com/api/users/currentuser';

export const signup = credentials => async dispatch => {
  try {
    const { data } = await axios.post(SIGNUP_URL, credentials);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: SIGNUP_FAILED });
  }
};

export const signin = credentials => async dispatch => {
  try {
    const { data } = await axios.post(SIGNIN_URL, credentials);
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: SIGNIN_FAILED });
  }
};

export const currentUser = () => async dispatch => {
  try {
    const { data } = await axios.get(CURRENT_USER_URL);
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({ type: SIGNIN_FAILED });
  }
};

export const signout = () => async dispatch => {
  try {
    await axios.post(SIGNOUT_URL);
    dispatch({
      type: SIGNOUT,
    });
  } catch (err) {
    console.error(err);
  }
};
