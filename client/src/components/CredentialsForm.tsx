import React from 'react';
import { useAppSelector } from '../redux/store/store';
import { Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import ErrorText from './ErrorText';
import { formStyles } from '../styles/form';
import { useStyledErrors } from '../hooks/styles';

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

  const styledErrors = useStyledErrors(errors);

  return (
    <View style={formStyles.container}>
      <View style={formStyles.error}>{didError && styledErrors}</View>

      <Text style={formStyles.label}>Username</Text>
      <View style={formStyles.fieldError}>
        {didError && usernameError && (
          <ErrorText error={usernameError.message} />
        )}
      </View>
      <TextInput
        style={[
          formStyles.textInput,
          isUsernameFocus && formStyles.textInputOnFocus,
        ]}
        onChangeText={setUsername}
        value={username}
        onFocus={toggleUsernameFocus}
        onBlur={toggleUsernameFocus}
      />

      <Text style={formStyles.label}>Password</Text>
      <View style={formStyles.fieldError}>
        {didError && passwordError && (
          <ErrorText error={passwordError.message} />
        )}
      </View>
      <TextInput
        style={[
          formStyles.textInput,
          isPasswordFocus && formStyles.textInputOnFocus,
        ]}
        onChangeText={setPassword}
        value={password}
        onFocus={togglePasswordFocus}
        onBlur={togglePasswordFocus}
      />

      <Pressable onPress={forwardSubmit}>
        <Text style={formStyles.button}>{buttonTitle}</Text>
      </Pressable>
    </View>
  );
};

export default CredentialsForm;
