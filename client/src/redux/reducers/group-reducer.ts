import { createReducer } from '@reduxjs/toolkit';
import { indexParticipants, newGroup } from '../actions/group-actions';
import { newMessage, socketMessage } from '../actions/message-actions';
import { getGroupMessages } from '../actions/message-actions';
import { RequestError } from '../actions/request-errors';

export interface Message {
  id: string;
  groupId: string;
  sender: string;
  payload: string;
  createdAt: string;
  errors?: RequestError[];
  status?: 'error' | 'sent' | 'delivered';
}

export interface Group {
  id: string;
  name: string;
  participants?: { username: string }[];
  messages: Message[];
  isNoMoreMessages: boolean;
  getMessagesFailed: boolean;
}

const initialGroupState: Group = {
  id: '',
  name: '',
  messages: [],
  isNoMoreMessages: false,
  getMessagesFailed: false,
};

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
      return {
        ...initialState,
        groups: [...groups, { ...initialGroupState, ...payload }],
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
        ...initialGroupState,
        ...g,
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
      group!.messages = [...group!.messages, ...payload.messages];
      group!.getMessagesFailed = false;
      group!.isNoMoreMessages = payload.isNoMoreMessages;
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
        group.getMessagesFailed = true;
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
    .addCase(newMessage.fulfilled, (state, { payload }) => {
      let group = state.groups.find(g => g.id === payload.groupId);
      group!.messages.unshift(payload);
      state.groups.map(g => {
        if (g.id === payload.groupId && group) {
          return group;
        }
        return g;
      });
      return state;
    })
    .addCase(newMessage.rejected, (state, { payload }) => {
      if (payload) {
        let group = state.groups.find(g => g.id === payload.groupId);
        group!.messages.unshift(payload);
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
    .addCase(socketMessage, (state, { payload }) => {
      let group = state.groups.find(g => g.id === payload.groupId);
      group!.messages.unshift(payload);
      state.groups.map(g => {
        if (g.id === payload.groupId && group) {
          return group;
        }
        return g;
      });
      return state;
    })
    .addDefaultCase(state => state),
);

export default groupReducer;
