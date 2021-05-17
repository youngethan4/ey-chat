import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../screens/DrawerNavigator';

export type Props = {
  name: string;
};

const ChatHeader: React.FC<Props> = ({ name }) => {
  const navigation: DrawerNavigationProp<DrawerParamList> = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>$</Text>
      </Pressable>
      <Text style={styles.title}>{name}</Text>
      <Pressable style={styles.button} onPress={navigation.toggleDrawer}>
        <Text style={styles.buttonText}>#</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    flex: 6,
    textAlign: 'center',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 45,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  button: {
    flex: 1,
    fontSize: 30,
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default ChatHeader;
