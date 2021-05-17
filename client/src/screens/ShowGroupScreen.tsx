import { RouteProp, useRoute } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ErrorText from '../components/ErrorText';
import ShowGroup from '../components/ShowGroup';
import WriteMessage from '../components/WriteMessage';
import { useAppSelector } from '../redux/store/store';
import { DrawerParamList } from './DrawerNavigator';

type ShowGroupScreenRouteProp = RouteProp<DrawerParamList, 'ShowGroupScreen'>;

const ShowGroupScreen = () => {
  const route: ShowGroupScreenRouteProp = useRoute();
  const groupId = route.params.groupId;
  const group = useAppSelector(state =>
    state.groups.groups.find(g => g.id === groupId),
  );
  const { name, getMessagesFailed } = group!;

  return (
    <View style={styles.container}>
      <ChatHeader name={name} />
      {getMessagesFailed ? (
        <ErrorText error={'Failed to load messages.'} />
      ) : (
        <View style={styles.container}>
          <ShowGroup />
          <View>
            <WriteMessage groupId={groupId} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShowGroupScreen;
