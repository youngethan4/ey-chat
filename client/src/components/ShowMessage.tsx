import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Message } from '../redux/reducers/group-reducer';
import { useAppSelector } from '../redux/store/store';
import { pink, purple } from '../styles/colors';

const ShowMessage: React.FC<Message> = ({ createdAt, payload, sender }) => {
  const date = new Date(createdAt);
  const [shouldShowDate, setShouldShowDate] = useState(false);

  const username = useAppSelector(state => state.auth.currentUser!.username);
  const isSender = username === sender ? true : false;

  const toggleShouldShowDate = () => {
    setShouldShowDate(!shouldShowDate);
  };

  return (
    <View
      style={[
        styles.messageContainer,
        isSender ? styles.alignRight : styles.alignLeft,
      ]}>
      <Text style={styles.text}>
        {sender} {shouldShowDate && `- ${date.toLocaleString()}`}
      </Text>
      <Pressable onPress={toggleShouldShowDate}>
        <Text
          style={[
            styles.message,
            isSender ? styles.isSender : styles.notSender,
          ]}>
          {payload}
        </Text>
      </Pressable>
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
    borderWidth: 1,
    backgroundColor: 'lightgray',
  },
});

export default ShowMessage;
