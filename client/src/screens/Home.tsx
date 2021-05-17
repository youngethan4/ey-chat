import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/store/store';
import { indexParticipants } from '../redux/actions/group-actions';
import { Text, View, StyleSheet } from 'react-native';
import ChatHeader from '../components/ChatHeader';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(indexParticipants());
  }, [dispatch]);

  return (
    <View>
      <ChatHeader name={'Get Started'} />
      <View style={styles.container}>
        <Text style={styles.info}>Welcome!</Text>
        <Text style={styles.info}>To begin, swipe to the left.</Text>
        <Text style={styles.info}>{'<---'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    alignItems: 'center',
  },
  info: {
    fontSize: 30,
  },
});

export default Home;
