import React, { useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import ShowGroup from './ShowGroup';
import CreateGroup from './CreateGroup';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { Group } from '../redux/reducers/group-reducer';
import { indexParticipants } from '../redux/actions/group-actions';
import { StyleSheet } from 'react-native';

export type DrawerParamList = {
  CreateGroup: undefined;
  ShowGroup: { groupId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  const { groups } = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();
  console.log(groups);

  useEffect(() => {
    dispatch(indexParticipants());
  }, [dispatch]);

  //Use kafka consumer to update drawer badges.
  //Once group is selected, register socket.io-client

  //Create a header within drawer with settings and createGroup button
  const customDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      openByDefault
      drawerContent={customDrawerContent}
      drawerPosition="right"
      edgeWidth={300}
      drawerType="slide"
      drawerContentOptions={{ labelStyle: styles.drawerContents }}
      overlayColor="transparent">
      <Drawer.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          title: 'Create new group',
        }}
      />
      {groups.map((g: Group, key) => (
        <Drawer.Screen
          name={g.id} //Not sure what is best way for dynamic creation
          initialParams={{ groupId: g.id }}
          component={ShowGroup}
          key={key}
          options={{ title: g.name }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContents: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    fontSize: 20,
  },
});

export default DrawerNavigation;
