import React from 'react';
import { useAppSelector } from '../redux/store/store';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import ErrorText from './ErrorText';

export type Props = {
  onSubmit: Function;
  didError: boolean;
  buttonTitle: string;
};

const CredentialsForm: React.FC<Props> = ({
  onSubmit,
  didError,
  buttonTitle,
}) => {
  const { errors } = useAppSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameFocus, setUsernameFocus] = useState(false);
  const [isPasswordFocus, setPasswordFocus] = useState(false);

  const forwardSubmit = () => {
    onSubmit({ username, password });
    setUsername('');
    setPassword('');
  };

  const toggleUsernameFocus = () => {
    setUsernameFocus(!isUsernameFocus);
  };
  const togglePasswordFocus = () => {
    setPasswordFocus(!isPasswordFocus);
  };

  const usernameError = errors.find(e => e.field === 'username');
  const passwordError = errors.find(e => e.field === 'password');

  const styledErrors = (
    <View>
      {errors
        .filter(e => !e.field)
        .map((e, key) => {
          <ErrorText error={e.message} key={key} />;
        })}
    </View>
  );

  return (
    <View style={styles.container}>
      {didError && styledErrors}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={[styles.textInput, isUsernameFocus && styles.textInputOnFocus]}
        onChangeText={setUsername}
        value={username}
        onFocus={toggleUsernameFocus}
        onBlur={toggleUsernameFocus}
      />
      {usernameError && <ErrorText error={usernameError.message} />}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.textInput, isPasswordFocus && styles.textInputOnFocus]}
        onChangeText={setPassword}
        value={password}
        onFocus={togglePasswordFocus}
        onBlur={togglePasswordFocus}
      />
      {passwordError && <ErrorText error={passwordError.message} />}
      <Pressable onPress={forwardSubmit}>
        <Text style={styles.button}>{buttonTitle}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#8400f7',
    marginBottom: 30,
    paddingTop: 5,
    paddingBottom: 0,
    fontSize: 18,
  },
  textInputOnFocus: {
    borderBottomColor: '#ff00e6',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginTop: 5,
    marginBottom: 5,
    marginStart: 10,
    marginEnd: 5,
  },
  button: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#8400f7',
    color: 'white',
    padding: 5,
    borderRadius: 10,
  },
});

export default CredentialsForm;
