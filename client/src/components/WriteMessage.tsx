import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { newMessage } from '../redux/actions/message-actions';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { pink, purple } from '../styles/colors';

type Props = {
  groupId: string;
};

const WriteMessage: React.FC<Props> = ({ groupId }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.user!.username);

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const sendMessage = () => {
    const payload = message.trim();
    if (payload.length > 0) {
      dispatch(
        newMessage({
          groupId,
          payload: message.trim(),
          sender: username,
        }),
      );
    }
    setMessage('');
  };

  const onEnter = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, isFocused && styles.textInputOnFocus]}
        multiline
        maxLength={500}
        onChangeText={setMessage}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        value={message}
        onKeyPress={onEnter}
        returnKeyType={'send'}
        blurOnSubmit={false}
        keyboardType={'default'}
      />
      <Pressable style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  sendButton: {
    flex: 1,
  },
  sendButtonText: {
    fontSize: 20,
    backgroundColor: purple,
    borderRadius: 10,
    padding: 7,
    margin: 5,
    marginEnd: 0,
    color: 'white',
  },
  textInput: {
    borderColor: purple,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    flex: 5,
    paddingVertical: 0,
    margin: 0,
    overflow: 'visible',
  },
  textInputOnFocus: {
    borderColor: pink,
  },
});

export default WriteMessage;
