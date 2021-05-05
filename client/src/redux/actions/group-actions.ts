import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Group } from '../reducers/group-reducer';
import { RequestErrors } from './request-errors';

const NEW_GROUP_URL = 'http://10.0.2.2/api/groups';
const INDEX_PARTICIPANT_URL = 'http://10.0.2.2/api/participants/groups';

interface GroupForm {
  name: string;
  participants: string[];
}

export const newGroup = createAsyncThunk<
  Group,
  GroupForm,
  { rejectValue: RequestErrors }
>('groups/new', async (group, thunkApi) => {
  try {
    const res = await axios.post(NEW_GROUP_URL, group);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const indexParticipants = createAsyncThunk<
  Group[],
  void,
  { rejectValue: RequestErrors }
>('participants/groups/index', async (n, thunkApi) => {
  try {
    const res = await axios.get(INDEX_PARTICIPANT_URL);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
