import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../redux/store/store';
import { View, Text, Pressable } from 'react-native';
import CredentailsForm from '../components/CredentialsForm';
import { signin } from '../redux/actions/auth-actions';
import { styles } from './styles/auth-pages';

type SigninScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signin'
>;

const SigninPage = () => {
  const navigation: SigninScreenNavigationProp = useNavigation();

  const { didSigninFail } = useAppSelector(state => state.auth);
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
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New User?</Text>
      </Pressable>
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
