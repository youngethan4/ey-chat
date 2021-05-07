import { RouteProp, useRoute } from '@react-navigation/core';
import React, { ComponentType, createRef } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ChatHeader from '../components/ChatHeader';
import ErrorText from '../components/ErrorText';
import Message from '../components/Message';
import { getGroupMessages } from '../redux/actions/message-actions';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { DrawerParamList } from './DrawerNavigator';

type ShowGroupScreenRouteProp = RouteProp<DrawerParamList, 'Group'>;

const ShowGroup = () => {
  const route: ShowGroupScreenRouteProp = useRoute();
  const dispatch = useAppDispatch();

  const groupId = route.params.groupId;
  const group = useAppSelector(state =>
    state.groups.groups.find(g => g.id === groupId),
  );
  const { messages, errors, getMessagesFailed } = useAppSelector(
    state => state.messages,
  );
  const scrollViewRef = createRef<ComponentType<ScrollView>>();

  const getMessages = () => {
    dispatch(
      getGroupMessages({
        groupId,
        lastCreatedAt: messages[0].createdAt,
      }),
    );
  };
  getMessages();

  const scrollToEnd = () => {
    scrollViewRef.current!.defaultProps!.scrollToEnd!({ animated: false });
  };

  return (
    <View>
      <ChatHeader name={group!.name} />
      {getMessagesFailed ? (
        errors.map(e => <ErrorText error={e.message} />)
      ) : (
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={scrollToEnd}
          onTouchStart={getMessages}>
          {messages.map((m, index) => (
            <Message key={index} {...m} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ShowGroup;
