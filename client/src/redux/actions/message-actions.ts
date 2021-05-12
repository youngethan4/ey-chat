import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Message } from '../reducers/group-reducer';
import { RequestError, RequestErrors } from './request-errors';

const MESSAGES_URL = 'http://10.0.2.2/api/messages';

interface Returned {
  messages: Message[];
  groupId: string;
}

interface GetGroupMessagesArgs {
  groupId: string;
  lastCreatedAt: string;
}

interface GetGroupMessagesThunkConfig extends RequestErrors {
  groupId: string;
}

export const getGroupMessages = createAsyncThunk<
  Returned,
  GetGroupMessagesArgs,
  { rejectValue: GetGroupMessagesThunkConfig }
>('messages/index', async (query, thunkApi) => {
  console.log('in getGroupMessages');
  try {
    const res = await axios.get(
      `${MESSAGES_URL}/${query.groupId}?lastCreatedAt=${query.lastCreatedAt}`,
    );
    console.log(res.data);
    return { messages: res.data, groupId: query.groupId };
  } catch (err: any) {
    console.log(err);
    const res: RequestErrors = err.response.data;
    return thunkApi.rejectWithValue({
      errors: res.errors,
      groupId: query.groupId,
    });
  }
});

interface NewMessageArgs {
  groupId: string;
  sender: string;
  payload: string;
}

export const newMessage = createAsyncThunk<
  Message,
  NewMessageArgs,
  { rejectValue: Message }
>('messages/new', async (message, thunkApi) => {
  try {
    const res = await axios.post(MESSAGES_URL, message);
    return { ...res.data, status: 'sent' };
  } catch (err: any) {
    const res: RequestError[] = err.response.data.errors;
    return thunkApi.rejectWithValue({
      ...message,
      createdAt: '',
      id: '',
      errors: res,
      status: 'error',
    });
  }
});
