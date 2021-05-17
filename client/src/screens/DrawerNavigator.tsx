import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import ShowGroupTest from './ShowGroupScreen';
import CreateGroup from './CreateGroup';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { Group } from '../redux/reducers/group-reducer';
import { indexParticipants } from '../redux/actions/group-actions';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { purple } from '../styles/colors';
import SettingsModal from '../components/SettingsModal';

export type DrawerParamList = {
  CreateGroupScreen: undefined;
  ShowGroupScreen: { groupId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  const { groups } = useAppSelector(state => state.groups);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(indexParticipants());
  }, [dispatch]);

  // const groupSocket = useGroupSocket();
  // groupSocket(groups.map(g => g.id));

  const [modalVisible, setModalVisible] = useState(false);
  const customDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <SettingsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <View style={[styles.drawerItem, styles.headerItem]}>
          <Pressable
            onPress={() => props.navigation.navigate('CreateGroupScreen')}>
            <Text style={[styles.headerButton, styles.createGroupButton]}>
              Create Group
            </Text>
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={[styles.headerButton, styles.settingsButton]}>%</Text>
          </Pressable>
        </View>
        {groups.map((g: Group, key) => (
          <DrawerItem
            style={styles.drawerItem}
            label={g.name}
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate(g.id)}
            key={key}
          />
        ))}
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
      overlayColor="transparent">
      <Drawer.Screen
        name="CreateGroupScreen"
        component={CreateGroup}
        options={{
          title: 'Create new group',
        }}
      />
      {groups.map((g: Group, key) => (
        <Drawer.Screen
          name={g.id} //Not sure what is best way for dynamic creation
          initialParams={{ groupId: g.id }}
          component={ShowGroupTest}
          key={key}
          options={{ title: g.name }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 20,
    padding: 0,
    alignSelf: 'flex-start',
    margin: 0,
  },
  drawerItem: {
    padding: 0,
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  headerItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createGroupButton: {
    borderWidth: 2,
    borderColor: purple,
  },
  settingsButton: {
    color: purple,
    backgroundColor: 'lightgray',
  },
  headerButton: {
    borderRadius: 25,
    fontSize: 25,
    padding: 5,
    paddingHorizontal: 12,
    margin: 5,
  },
});

export default DrawerNavigation;
