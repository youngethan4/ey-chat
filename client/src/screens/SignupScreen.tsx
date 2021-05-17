import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../redux/store/store';
import { View, Text, Pressable } from 'react-native';
import CredentailsFrom from '../components/CredentialsForm';
import { signup } from '../redux/actions/auth-actions';
import { styles } from '../styles/auth-pages';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

const SignupPage = () => {
  const navigation: SignupScreenNavigationProp = useNavigation();

  const dispatch = useAppDispatch();
  const { didSignupFail } = useAppSelector(state => state.auth);

  const buttonTitle = 'Sign Up';
  const onSubmit = (credentials: { username: string; password: string }) => {
    dispatch(signup(credentials));
  };

  return (
    <View>
      <Text style={styles.title}>Sign up with ey-chat</Text>
      <Pressable onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.link}>Already have an account?</Text>
      </Pressable>
      <View style={styles.container}>
        <CredentailsFrom
          onSubmit={onSubmit}
          buttonTitle={buttonTitle}
          didError={didSignupFail}
        />
      </View>
    </View>
  );
};

export default SignupPage;
