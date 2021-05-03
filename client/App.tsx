/**
 * Sample React Native App
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
//import SignupPage from './src/pages/SignupPage';
import SigninPage from './src/pages/SigninPage';

const App = () => {
  return (
    <Provider store={store}>
      <SigninPage />
    </Provider>
  );
};

export default App;
