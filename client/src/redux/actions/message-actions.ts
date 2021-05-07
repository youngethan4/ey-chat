import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Message } from '../reducers/message-reducer';
import { RequestError, RequestErrors } from './request-errors';

const MESSAGES_URL = '/api/messages';

interface ThunkArg {
  groupId: string;
  lastCreatedAt: Date;
}

export const getGroupMessages = createAsyncThunk<
  Message[],
  ThunkArg,
  { rejectValue: RequestError[] }
>('messages/index', async (groupId, thunkApi) => {
  try {
    const res = await axios.get(`${MESSAGES_URL}/${groupId}`);
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    const res: RequestErrors = err.response.data;
    return thunkApi.rejectWithValue(res.errors);
  }
});
