import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getData, removeData, storeData } from '../../async-storage/storage';
import { CurrentUser } from '../reducers/auth-reducer';
import { RequestErrors } from './request-errors';

const SIGNIN_URL = 'http://10.0.2.2/api/users/signin';
const SIGNUP_URL = 'http://10.0.2.2/api/users/signup';
const SIGNOUT_URL = 'http://10.0.2.2/api/users/signout';
const CURRENT_USER_URL = 'http://10.0.2.2/api/users/currentuser';

const TOKEN_KEY = 'token';

interface Credentials {
  username: string;
  password: string;
}

interface Returned {
  user: CurrentUser;
  token: string;
}

export const signup = createAsyncThunk<
  Returned,
  Credentials,
  { rejectValue: RequestErrors }
>('users/signup', async (credentials, thunkApi) => {
  try {
    const res = await axios.post(SIGNUP_URL, credentials);
    const ret: Returned = res.data;
    await storeData(TOKEN_KEY, ret.token);
    setAxiosAuthHeader(ret.token);
    return ret;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const signin = createAsyncThunk<
  Returned,
  Credentials,
  { rejectValue: RequestErrors }
>('users/signin', async (credentials, thunkApi) => {
  try {
    const res = await axios.post(SIGNIN_URL, credentials);
    const ret: Returned = res.data;
    await storeData(TOKEN_KEY, ret.token);
    setAxiosAuthHeader(ret.token);
    return ret;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const currentUser = createAsyncThunk('users/currentuser', async () => {
  try {
    const token = await getData(TOKEN_KEY);
    if (token) {
      setAxiosAuthHeader(token);
    }
    const res = await axios.get(CURRENT_USER_URL);
    return { user: res.data, token };
  } catch (err) {
    return;
  }
});

export const signout = createAsyncThunk('users/signout', async () => {
  await removeData(TOKEN_KEY);
  await axios.post(SIGNOUT_URL);
  return;
});

const setAxiosAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = token;
};
