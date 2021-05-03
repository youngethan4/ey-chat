import React from 'react';
import { useAppSelector, useAppDispatch } from '../redux/store/store';
import { View, Text } from 'react-native';
import CredentailsForm from '../components/CredentialsForm';
import { signin } from '../redux/actions/auth-actions';
import { styles } from './styles/auth-pages';

const SigninPage = () => {
  const didSigninFail = useAppSelector(state => state.auth.didSigninFail);
  const dispatch = useAppDispatch();

  const buttonTitle = 'Sign In';
  const onSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
    await dispatch(signin(credentials));
  };

  return (
    <View>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={styles.container}>
        <CredentailsForm
          onSubmit={onSubmit}
          buttonTitle={buttonTitle}
          didError={didSigninFail}
        />
      </View>
    </View>
  );
};

export default SigninPage;
