import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, NativeScrollEvent, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ChatHeader from '../components/ChatHeader';
import ErrorText from '../components/ErrorText';
import ShowMessage from '../components/ShowMessage';
import WriteMessage from '../components/WriteMessage';
import { getGroupMessages } from '../redux/actions/message-actions';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { DrawerParamList } from './DrawerNavigator';

type ShowGroupScreenRouteProp = RouteProp<DrawerParamList, 'Group'>;

const ShowGroup = () => {
  const [isInitialRender, setInitialRender] = useState(true);
  const route: ShowGroupScreenRouteProp = useRoute();
  const dispatch = useAppDispatch();

  const groupId = route.params.groupId;
  const group = useAppSelector(state =>
    state.groups.groups.find(g => g.id === groupId),
  );
  const { messages, name } = group!;
  let scrollViewRef = useRef<ScrollView>(null);

  const getMessages = () => {
    if (
      group &&
      !group.messages.getMessagesFailed &&
      !group.messages.isNoMoreMessages
    ) {
      console.log('here', messages.messages[0]?.createdAt || '');
      dispatch(
        getGroupMessages({
          groupId,
          lastCreatedAt: messages.messages[0]?.createdAt || '',
        }),
      );
    }
  };

  //Tomorrow: Prevent getMessages call from going too soon.
  //Add scroll to end on message if at bottom already
  //Add scrollTo for when old messages are loaded.

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  useEffect(() => {
    getMessages();
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    return () => Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _keyboardDidShow = () => {
    setTimeout(scrollToEnd, 1); //Seems to take 1 second for some reason...
  };

  const handleContentSizeChange = (w: number, h: number) => {
    if (isInitialRender) {
      scrollToEnd();
      setInitialRender(false);
    }
    console.log(h);
  };

  const handleScroll = (e: { nativeEvent: NativeScrollEvent }) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    console.log(yOffset);
    console.log(e.nativeEvent.contentSize.height);
    console.log(e.nativeEvent.layoutMeasurement.height);
    if (yOffset < 500) {
      getMessages();
    }
  };

  return (
    <View style={styles.container}>
      <ChatHeader name={name} />
      {messages.getMessagesFailed ? (
        messages.errors.map(e => <ErrorText error={e.message} />)
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            onContentSizeChange={handleContentSizeChange}
            onScrollEndDrag={handleScroll}
            onScrollBeginDrag={handleScroll}>
            {messages.messages.map((m, index) => (
              <ShowMessage key={index} {...m} />
            ))}
          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
});

export default ShowGroup;
