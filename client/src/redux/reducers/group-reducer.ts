import { createReducer } from '@reduxjs/toolkit';
import { indexParticipants, newGroup } from '../actions/group-actions';
import { RequestError } from '../actions/request-errors';

export interface Group {
  id: string;
  name: string;
  participants?: [{ username: string }];
}

interface GroupState {
  groups: Group[];
  errors: RequestError[];
  newGroupError: boolean;
  indexParticipantsError: boolean;
}

const initialState: GroupState = {
  groups: [],
  errors: [],
  newGroupError: false,
  indexParticipantsError: false,
};

const groupReducer = createReducer(initialState, builder =>
  builder
    .addCase(newGroup.fulfilled, ({ groups }, { payload }) => {
      return { ...initialState, groups: [...groups, payload] };
    })
    .addCase(newGroup.rejected, (state, { payload }) => {
      if (payload) {
        return { ...state, newGroupError: true, errors: payload.errors };
      }
      return { ...state, newGroupError: true };
    })
    .addCase(indexParticipants.fulfilled, (state, { payload }) => {
      return { ...initialState, groups: payload };
    })
    .addCase(indexParticipants.rejected, (state, { payload }) => {
      if (payload) {
        if (payload) {
          return {
            ...state,
            indexParticipantsError: true,
            errors: payload.errors,
          };
        }
        return { ...state, indexParticipantsError: true };
      }
    })
    .addDefaultCase(state => state),
);

export default groupReducer;
