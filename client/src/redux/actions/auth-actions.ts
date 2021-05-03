import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CurrentUser } from '../reducers/auth-reducer';

const SIGNIN_URL = 'http://10.0.2.2/api/users/signin';
const SIGNUP_URL = 'https://10.0.2.2/api/users/signup';
const SIGNOUT_URL = 'https://10.0.2.2/api/users/signout';
const CURRENT_USER_URL = 'https://10.0.2.2/api/users/currentuser';

interface Errors {
  errors: [{ message: string; field?: string }];
}

interface Credentials {
  username: string;
  password: string;
}

export const signup = createAsyncThunk<
  CurrentUser,
  Credentials,
  { rejectValue: Errors }
>('users/signup', async (credentials, thunkApi) => {
  const res = await axios.post(SIGNUP_URL, credentials);
  if (res.status !== 200) {
    return thunkApi.rejectWithValue(res.data);
  }
  return res.data;
});

export const signin = createAsyncThunk<
  CurrentUser,
  Credentials,
  { rejectValue: Errors }
>('users/signin', async (credentials, thunkApi) => {
  console.log('help');
  let res;
  try {
    res = await axios.post(SIGNIN_URL, credentials);
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(res);
  if (res.status !== 200) {
    return thunkApi.rejectWithValue(res.data);
  }
  return res.data;
});

export const currentUser = createAsyncThunk('users/currentuser', async () => {
  const res = await axios.get(CURRENT_USER_URL);
  return res.data;
});

export const signout = createAsyncThunk('users/signout', async () => {
  await axios.post(SIGNOUT_URL);
  return;
});
