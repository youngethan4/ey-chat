import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../pages/DrawerNavigator';

export type Props = {
  name: string;
};

const ChatHeader: React.FC<Props> = ({ name }) => {
  const navigation: DrawerNavigationProp<DrawerParamList> = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Pressable style={styles.button} onPress={navigation.toggleDrawer}>
        <Text>{'<>'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    alignSelf: 'center',
    flex: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
});

export default ChatHeader;
