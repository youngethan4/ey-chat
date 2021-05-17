import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import RootNavigator from './src/screens/RootNavigator';
import store from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
