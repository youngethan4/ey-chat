import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Group from './Group';
import Home from './Home';
import CreateGroup from './CreateGroup';

export type DrawerParamList = {
  Home: undefined;
  CreateGroup: undefined;
  Group: { name: string };
};

const Drawer = createDrawerNavigator();
const test = ['hi', 'hello'];

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      edgeWidth={200}
      drawerType="slide">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="CreateGroup" component={CreateGroup} />
      {test.map((s: string, key) => (
        <Drawer.Screen name={s} component={Group} key={key} />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
