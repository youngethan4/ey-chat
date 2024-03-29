import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { groupSocketClient } from '../../socket-io/group-socket-client';
import { Group } from '../reducers/group-reducer';
import { RequestError, RequestErrors } from './request-errors';

const NEW_GROUP_URL = 'http://10.0.2.2/api/groups';
const INDEX_PARTICIPANT_URL = 'http://10.0.2.2/api/participants/groups';

interface GroupForm {
  name: string;
  participants: string[];
}

export const newGroup = createAsyncThunk<
  Group,
  GroupForm,
  { rejectValue: RequestError[] }
>('groups/new', async (group, thunkApi) => {
  try {
    const res = await axios.post(NEW_GROUP_URL, group);
    const createdGroup: Group = res.data;
    groupSocketClient.joinRoom([createdGroup.id]);
    return createdGroup;
  } catch (err: any) {
    const res: RequestErrors = err.response.data;
    return thunkApi.rejectWithValue(res.errors);
  }
});

export const indexParticipants = createAsyncThunk<
  Group[],
  void,
  { rejectValue: RequestError[] }
>('participants/groups/index', async (n, thunkApi) => {
  try {
    const res = await axios.get(INDEX_PARTICIPANT_URL);
    const groups: Group[] = res.data;
    groupSocketClient.joinRoom(groups.map(g => g.id));
    return groups;
  } catch (err: any) {
    const res: RequestErrors = err.response.data;
    return thunkApi.rejectWithValue(res.errors);
  }
});
