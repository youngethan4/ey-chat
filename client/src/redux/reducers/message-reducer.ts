import { createReducer } from '@reduxjs/toolkit';
import { getGroupMessages } from '../actions/message-actions';
import { RequestError } from '../actions/request-errors';

export interface Message {
  groupId: string;
  sender: string;
  payload: string;
  createdAt: Date;
}

interface MessageState {
  messages: Message[];
  getMessagesFailed: boolean;
  errors: RequestError[];
}

const initalState: MessageState = {
  messages: [],
  getMessagesFailed: false,
  errors: [],
};

const messageReducer = createReducer(initalState, builder =>
  builder
    .addCase(getGroupMessages.fulfilled, (state, { payload }) => {
      return { ...state, getMessagesFailed: false, messages: payload };
    })
    .addCase(getGroupMessages.rejected, (state, { payload }) => {
      if (payload) {
        return { ...state, getMessagesFailed: true, errors: payload };
      }
      return { ...state, getMessagesFailed: true };
    }),
);

export default messageReducer;
