import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import { Group } from '../redux/reducers/group-reducer';
import { useAppSelector } from '../redux/store/store';
import { DrawerParamList } from './DrawerNavigator';

type ShowGroupScreenRouteProp = RouteProp<DrawerParamList>;

const ShowGroup = () => {
  //Cant set a RouteProp due to use of dynamic Drawer Screen creation
  const route = useRoute();
  const groupId = route.params!.groupId;
  console.log(groupId);
  const group = useAppSelector(state =>
    state.groups.groups.find(g => g.id === groupId),
  );
  return (
    <View>
      <ChatHeader name={group!.name} />
    </View>
  );
};

export default ShowGroup;
