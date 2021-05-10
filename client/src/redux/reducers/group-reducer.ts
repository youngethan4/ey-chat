import { createReducer } from '@reduxjs/toolkit';
import { indexParticipants, newGroup } from '../actions/group-actions';
import { getGroupMessages } from '../actions/message-actions';
import { RequestError } from '../actions/request-errors';

export interface Message {
  groupId: string;
  sender: string;
  payload: string;
  createdAt: string;
}

interface MessageState {
  messages: Message[];
  getMessagesFailed: boolean;
  isNoMoreMessages: boolean;
  errors: RequestError[];
}

export interface Group {
  id: string;
  name: string;
  participants?: { username: string }[];
  messages: MessageState;
}

interface GroupState {
  groups: Group[];
  errors: RequestError[];
  newGroupError: boolean;
  indexParticipantsError: boolean;
}

const initialMessageState: MessageState = {
  messages: [],
  getMessagesFailed: false,
  isNoMoreMessages: false,
  errors: [],
};

const initialState: GroupState = {
  groups: [],
  errors: [],
  newGroupError: false,
  indexParticipantsError: false,
};

const groupReducer = createReducer(initialState, builder =>
  builder
    .addCase(newGroup.fulfilled, ({ groups }, { payload }) => {
      return {
        ...initialState,
        groups: [...groups, { ...payload, messages: initialMessageState }],
      };
    })
    .addCase(newGroup.rejected, (state, { payload }) => {
      if (payload) {
        return { ...state, newGroupError: true, errors: payload };
      }
      return { ...state, newGroupError: true };
    })
    .addCase(indexParticipants.fulfilled, (state, { payload }) => {
      const groups = payload.map(g => ({
        ...g,
        messages: initialMessageState,
      }));
      return { ...initialState, groups };
    })
    .addCase(indexParticipants.rejected, (state, { payload }) => {
      if (payload) {
        if (payload) {
          return {
            ...state,
            indexParticipantsError: true,
            errors: payload,
          };
        }
        return { ...state, indexParticipantsError: true };
      }
    })
    .addCase(getGroupMessages.fulfilled, (state, { payload }) => {
      let group = state.groups.find(g => g.id === payload.groupId);
      group!.messages.messages = [
        ...payload.messages,
        ...group!.messages.messages,
      ];
      group!.messages.getMessagesFailed = false;
      if (payload.messages.length === 0) {
        group!.messages.isNoMoreMessages = true;
      }
      state.groups.map(g => {
        if (g.id === payload.groupId && group) {
          return group;
        }
        return g;
      });
      return state;
    })
    .addCase(getGroupMessages.rejected, (state, { payload }) => {
      let group = state.groups.find(g => g.id === payload?.groupId);
      if (payload && group) {
        group.messages.getMessagesFailed = true;
        state.groups.map(g => {
          if (g.id === payload.groupId && group) {
            return group;
          }
          return g;
        });
        return state;
      }
      return state;
    })
    .addDefaultCase(state => state),
);

export default groupReducer;
