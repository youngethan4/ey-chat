import React from 'react';
import {
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Message } from '../redux/reducers/group-reducer';
import { pink, purple } from '../styles/colors';

const ShowMessageTest: ListRenderItem<Message> = props => {
  const { createdAt, payload, sender } = props.item;
  const date = new Date(createdAt).toLocaleString();
  console.log(props.username);

  return (
    <View style={[styles.messageContainer, styles.alignLeft]}>
      <Text style={styles.text}>{sender}</Text>
      <Pressable>
        <Text style={[styles.message, styles.notSender]}>{payload}</Text>
      </Pressable>
      <Text style={styles.text}>{date}</Text>
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
    marginStart: 20,
  },
  notSender: {
    borderColor: purple,
    marginEnd: 20,
    borderWidth: 1,
    backgroundColor: 'lightgray',
  },
});

export default ShowMessageTest;
