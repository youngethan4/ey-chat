import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShowGroup from './ShowGroup';
import CreateGroup from './CreateGroup';
import { useAppSelector } from '../redux/store/store';
import { Group } from '../redux/reducers/group-reducer';

export type DrawerParamList = {
  Home: undefined;
  CreateGroup: undefined;
  Group: { group: Group };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  const { groups } = useAppSelector(state => state.groups);

  return (
    <Drawer.Navigator
      openByDefault={true}
      drawerPosition="right"
      edgeWidth={300}
      drawerType="slide">
      <Drawer.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          title: 'Create new group',
        }}
      />
      {groups.map((g: Group, key) => (
        <Drawer.Screen
          name={g.name}
          initialParams={{ group: g }}
          component={ShowGroup}
          key={key}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
