import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Message } from '../reducers/group-reducer';
import { RequestError, RequestErrors } from './request-errors';

const MESSAGES_URL = 'http://10.0.2.2/api/messages';

interface Returned {
  messages: Message[];
  groupId: string;
}

interface ThunkArg {
  groupId: string;
  lastCreatedAt: string;
}

interface ThunkApi {
  errors: RequestError[];
  groupId: string;
}

export const getGroupMessages = createAsyncThunk<
  Returned,
  ThunkArg,
  { rejectValue: ThunkApi }
>('messages/index', async (thunkArg, thunkApi) => {
  console.log('in getGroupMessages');
  try {
    const res = await axios.get(
      `${MESSAGES_URL}/${thunkArg.groupId}?lastCreatedAt=${thunkArg.lastCreatedAt}`,
    );
    console.log(res.data);
    return { messages: res.data, groupId: thunkArg.groupId };
  } catch (err: any) {
    console.log(err);
    const res: RequestErrors = err.response.data;
    return thunkApi.rejectWithValue({
      errors: res.errors,
      groupId: thunkArg.groupId,
    });
  }
});
