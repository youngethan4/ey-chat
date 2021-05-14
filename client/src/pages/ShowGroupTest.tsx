import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ErrorText from '../components/ErrorText';
import WriteMessage from '../components/WriteMessage';
import {
  dayToString,
  getPeriod,
  monthToString,
  to12hrFormat,
} from '../helpers/date-helpers';
import { getGroupMessages } from '../redux/actions/message-actions';
import { Message } from '../redux/reducers/group-reducer';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { pink, purple } from '../styles/colors';
import { DrawerParamList } from './DrawerNavigator';

type ShowGroupScreenRouteProp = RouteProp<DrawerParamList, 'ShowGroupScreen'>;
const MESSAGE_LIMIT = 25;

const ShowGroupTest = () => {
  const route: ShowGroupScreenRouteProp = useRoute();
  const dispatch = useAppDispatch();

  const username = useAppSelector(state => state.auth.user!.username);
  const groupId = route.params.groupId;
  const group = useAppSelector(state =>
    state.groups.groups.find(g => g.id === groupId),
  );
  const { messages, name, getMessagesFailed, isNoMoreMessages } = group!;

  const getMessages = () => {
    console.log(messages[messages.length - 1]);
    if (group && !getMessagesFailed && !isNoMoreMessages) {
      dispatch(
        getGroupMessages({
          groupId,
          lastCreatedAt: messages[messages.length - 1]?.createdAt,
          limit: MESSAGE_LIMIT,
        }),
      );
    }
  };

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showDate, setShowDate] = useState({ index: 0, shouldShow: false });
  const ShowMessageTest: ListRenderItem<Message> = ({ item, index }) => {
    const { createdAt, payload, sender } = item;
    const date = new Date(createdAt);
    const dateString = `${to12hrFormat(
      date.getHours(),
    )}:${date.getMinutes()} ${getPeriod(date.getHours())}: ${dayToString(
      date.getDay(),
    )} ${monthToString(date.getMonth())} ${date.getDate()}`;
    const isSender = username === sender;

    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.alignRight : styles.alignLeft,
        ]}>
        {!isSender && <Text style={styles.text}>{sender}</Text>}
        <Pressable
          onPress={() =>
            setShowDate({
              index,
              shouldShow:
                index === showDate.index ? !showDate.shouldShow : true,
            })
          }>
          <Text
            style={[
              styles.message,
              isSender ? styles.isSender : styles.notSender,
            ]}>
            {payload}
          </Text>
        </Pressable>
        {showDate.shouldShow && showDate.index === index && (
          <Text style={styles.text}>{dateString}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ChatHeader name={name} />
      {getMessagesFailed ? (
        <ErrorText error={'Failed to load messages.'} />
      ) : (
        <View style={styles.container}>
          <FlatList
            style={styles.container}
            data={messages}
            extraData={[username, showDate]}
            renderItem={ShowMessageTest}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={2}
            onEndReached={getMessages}
            inverted
          />
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
  messageContainer: {
    margin: 5,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 14,
  },
  message: {
    fontSize: 16,
    borderRadius: 10,
    padding: 5,
    margin: 2,
  },
  isSender: {
    backgroundColor: pink,
    marginStart: 20,
  },
  notSender: {
    borderColor: purple,
    marginEnd: 20,
    borderWidth: 1,
    backgroundColor: 'lightgray',
  },
});

export default ShowGroupTest;
