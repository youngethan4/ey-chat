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

type ShowGroupScreenRouteProp = RouteProp<DrawerParamList, 'ShowGroup'>;
const MESSAGE_LIMIT = 25;

const ShowGroup = () => {
  const route: ShowGroupScreenRouteProp = useRoute();
  const dispatch = useAppDispatch();

  const groupId = route.params.groupId;
  const group = useAppSelector(state =>
    state.groups.groups.find(g => g.id === groupId),
  );
  const { messages, name, getMessagesFailed, isNoMoreMessages } = group!;

  const [isLoadingMoreMessages, setIsLoadingMoreMessage] = useState(false);
  const getMessages = () => {
    setIsLoadingMoreMessage(true);
    if (group && getMessagesFailed && isNoMoreMessages) {
      dispatch(
        getGroupMessages({
          groupId,
          lastCreatedAt: messages[0]?.createdAt,
          limit: MESSAGE_LIMIT,
        }),
      );
    }
  };

  useEffect(() => {
    getMessages();
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    return () => Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _keyboardDidShow = () => {
    setTimeout(scrollToEnd, 1);
  };

  let scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const [screenDetails, setScreenDetails] = useState({
    yOffset: 0,
    layoutHeight: 500,
  });
  const handleScroll = (e: { nativeEvent: NativeScrollEvent }) => {
    setScreenDetails({
      yOffset: e.nativeEvent.contentOffset.y,
      layoutHeight: e.nativeEvent.layoutMeasurement.height,
    });
  };

  const onBottom = (h: number): boolean => {
    const { yOffset, layoutHeight } = screenDetails;
    if (yOffset + layoutHeight > h - 100) {
      return true;
    }
    return false;
  };

  const [isInitialRender, setInitialRender] = useState(true);
  const [oldHeight, setOldHeight] = useState(0);
  const handleContentSizeChange = (w: number, h: number) => {
    if (isInitialRender) {
      scrollToEnd();
      setInitialRender(false);
    } else {
      if (onBottom(h)) {
        scrollToEnd();
      } else {
        if (scrollViewRef.current && isLoadingMoreMessages) {
          scrollViewRef.current.scrollTo({
            animated: false,
            y: screenDetails.yOffset + (h - oldHeight),
          });
          setIsLoadingMoreMessage(false);
        } else {
          // TODO: Set new messages button
        }
      }
    }
    setOldHeight(h);
  };

  const onScrollNearTop = (e: { nativeEvent: NativeScrollEvent }) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    if (yOffset < 500 && !isLoadingMoreMessages) {
      getMessages();
    }
  };

  return (
    <View style={styles.container}>
      <ChatHeader name={name} />
      {getMessagesFailed ? (
        <ErrorText error={'Failed to load messages.'} />
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            onContentSizeChange={handleContentSizeChange}
            onScrollEndDrag={onScrollNearTop}
            onScrollBeginDrag={onScrollNearTop}
            onMomentumScrollEnd={onScrollNearTop}
            onScroll={handleScroll}>
            {messages.map((m, index) => (
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
