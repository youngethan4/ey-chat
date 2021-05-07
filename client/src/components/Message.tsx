import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Message } from '../redux/reducers/message-reducer';
import { useAppSelector } from '../redux/store/store';
import { pink, purple } from '../styles/colors';

const Message: React.FC<Message> = ({ createdAt, payload, sender }) => {
  const [shouldShowDate, setShouldShowDate] = useState(false);
  const showDate = (
    <Text style={styles.text}>{createdAt.toLocaleTimeString()}</Text>
  );

  const username = useAppSelector(state => state.auth.currentUser!.username);
  const isSender = username === sender ? true : false;

  return (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.alignRight : styles.alignLeft,
      ]}>
      <Text style={styles.text}>{sender}</Text>
      <Pressable onPress={() => setShouldShowDate(!showDate)}>
        <Text
          style={[
            styles.message,
            isSender ? styles.isSender : styles.notSender,
          ]}>
          {payload}
        </Text>
      </Pressable>
      {shouldShowDate && showDate}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  notSender: {
    borderColor: purple,
    backgroundColor: 'lightgray',
  },
});

export default Message;
