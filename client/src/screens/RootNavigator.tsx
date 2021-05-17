import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../redux/store/store';
import SignupPage from './SignupScreen';
import SigninPage from './SigninScreen';
import DrawerNavigation from './DrawerNavigator';

export type RootStackParamList = {
  Signin: undefined;
  Signup: undefined;
  Chat: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isSignedin = useAppSelector(state => state.auth.isSignedin);
  console.log(isSignedin);

  const currentPages = isSignedin ? (
    <>
      <Stack.Screen
        name="Chat"
        component={DrawerNavigation}
        options={{ title: 'A Chat App' }}
      />
    </>
  ) : (
    <>
      <Stack.Screen
        name="Signin"
        component={SigninPage}
        options={{ title: 'Existing User' }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupPage}
        options={{ title: 'New User' }}
      />
    </>
  );
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerShown: false,
        }}>
        {currentPages}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
