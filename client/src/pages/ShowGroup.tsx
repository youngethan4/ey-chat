import { RouteProp, useRoute } from '@react-navigation/core';
import React, { createRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ChatHeader from '../components/ChatHeader';
import ErrorText from '../components/ErrorText';
import ShowMessage from '../components/ShowMessage';
import WriteMessage from '../components/WriteMessage';
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
  const { messages, name } = group!;

  const scrollViewRef = createRef<ScrollView>();

  const getMessages = () => {
    if (
      group &&
      !group.messages.getMessagesFailed &&
      !group.messages.isNoMoreMessages
    ) {
      console.log('here', messages.messages[0]?.createdAt || '');
      dispatch(
        getGroupMessages({
          groupId,
          lastCreatedAt: messages.messages[0]?.createdAt || '',
        }),
      );
    }
  };

  getMessages();

  const scrollToEnd = () => {
    scrollViewRef.current!.scrollToEnd({ animated: false });
  };

  return (
    <View style={styles.container}>
      <ChatHeader name={name} />
      {messages.getMessagesFailed ? (
        messages.errors.map(e => <ErrorText error={e.message} />)
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            onContentSizeChange={scrollToEnd}
            onTouchStart={getMessages}>
            {messages.messages.map((m, index) => (
              <ShowMessage key={index} {...m} />
            ))}
          </ScrollView>
          <View>
            <WriteMessage groupId={groupId} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export default ShowGroup;
