import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import ShowGroupTest from './ShowGroupTest';
import CreateGroup from './CreateGroup';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { Group } from '../redux/reducers/group-reducer';
import { indexParticipants } from '../redux/actions/group-actions';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { pink, purple } from '../styles/colors';
import { signout } from '../redux/actions/auth-actions';

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

  //Use kafka consumer to update drawer badges.
  //Once group is selected, register socket.io-client

  //Create a header within drawer with settings and createGroup button
  const [modalVisible, setModalVisible] = useState(false);
  const customDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <View style={styles.modalSubView}>
              <Pressable onPress={async () => await dispatch(signout())}>
                <Text style={styles.modalButton}>Sign Out</Text>
              </Pressable>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButton, styles.closeButton]}>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={[styles.drawerItem, styles.headerItem]}>
          <DrawerItem
            style={styles.createGroup}
            label="Create Group"
            labelStyle={[styles.drawerLabel, styles.headerLabel]}
            onPress={() => props.navigation.navigate('CreateGroupScreen')}
          />
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.settingsButton}>%</Text>
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
  },
  headerLabel: {
    flex: 1,
    alignSelf: 'center',
  },
  createGroup: {
    borderWidth: 2,
    borderColor: purple,
    borderRadius: 20,
    flex: 1,
    alignSelf: 'flex-start',
    padding: 0,
    margin: 0,
    marginStart: 20,
  },
  settingsButton: {
    color: purple,
    backgroundColor: 'lightgray',
    borderRadius: 25,
    flex: 1,
    fontSize: 25,
    padding: 10,
    paddingHorizontal: 17,
    margin: 5,
    marginEnd: 20,
  },
  modalView: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  modalSubView: {
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 25,
    paddingHorizontal: 50,
    margin: 100,
    backgroundColor: 'white',
  },
  modalButton: {
    borderWidth: 2,
    borderColor: purple,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 18,
  },
  closeButton: {
    borderColor: pink,
    color: 'black',
  },
});

export default DrawerNavigation;
