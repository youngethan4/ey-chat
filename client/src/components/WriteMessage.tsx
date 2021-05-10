import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { pink, purple } from '../styles/colors';

type Props = {
  groupId: string;
};

const WriteMessage: React.FC<Props> = ({ groupId }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const sendMessage = () => {
    console.log('sending... ', groupId);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput, isFocused && styles.textInputOnFocus]}
        multiline
        onChangeText={setMessage}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        value={message}
      />
      <Pressable style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
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
