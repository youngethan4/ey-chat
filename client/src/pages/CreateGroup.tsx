import axios from 'axios';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  TextStyle,
} from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ErrorText from '../components/ErrorText';
import { useStyledErrors } from '../hooks/styles';
import { newGroup } from '../redux/actions/group-actions';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import { purple } from '../styles/colors';
import { formStyles } from '../styles/form';

const CreateGroup = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.user?.username);
  const { errors, newGroupError } = useAppSelector(state => state.groups);
  const [name, setName] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [participants, setParticipants] = useState([] as string[]);
  const [isQueryFocused, setIsQueryFocused] = useState(false);
  const [searchResult, setSearchResult] = useState([] as string[]);

  const onSubmit = () => {
    dispatch(newGroup({ name, participants: [username!, ...participants] }));
    setSearchResult([]);
    setParticipants([]);
    setName('');
  };

  const search = async (query: string) => {
    if (query !== '') {
      try {
        const res = await axios.get(`http://10.0.2.2/api/users?user=${query}`);
        setSearchResult(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    } else {
      setSearchResult([]);
    }
  };

  const groupNameError = errors.find(e => e.field === 'name');
  const styledErrors = useStyledErrors(errors);

  const addedUsers = participants.map((user, key) => (
    <View key={key} style={styles.addedUserContainer}>
      <Text style={styles.user}>{user}</Text>
      <Pressable
        onPress={() => setParticipants(participants.filter(u => u !== user))}>
        <Text style={styles.addedUserRemove}>X</Text>
      </Pressable>
    </View>
  ));

  const searchedUsers = searchResult
    .filter(user => !participants.includes(user))
    .map((user, key) => (
      <View key={key} style={styles.searchedUser}>
        <Text style={styles.user}>{user}</Text>
        <Pressable onPress={() => setParticipants([...participants, user])}>
          <Text style={styles.searchedUserAdd}>+</Text>
        </Pressable>
      </View>
    ));

  return (
    <View>
      <ChatHeader name="Create Group" />
      <View style={formStyles.container}>
        <Pressable onPress={onSubmit}>
          <Text style={styles.createButton}>Create</Text>
        </Pressable>
        <View style={formStyles.error}>{newGroupError && styledErrors}</View>

        <View style={formStyles.fieldError}>
          {groupNameError && newGroupError && (
            <ErrorText error={groupNameError.message} />
          )}
        </View>
        <Text style={formStyles.label}>Group name</Text>
        <TextInput
          style={[
            formStyles.textInput,
            isNameFocused && formStyles.textInputOnFocus,
          ]}
          onChangeText={setName}
          onFocus={() => setIsNameFocused(!isNameFocused)}
          onBlur={() => setIsNameFocused(!isNameFocused)}
        />

        <Text style={formStyles.label}>Add people</Text>
        {addedUsers}
        <TextInput
          style={[
            formStyles.textInput,
            isNameFocused && formStyles.textInputOnFocus,
          ]}
          onChangeText={search}
          onFocus={() => setIsQueryFocused(!isQueryFocused)}
          onBlur={() => setIsQueryFocused(!isQueryFocused)}
        />
        <View style={styles.searchedUserContainer}>{searchedUsers}</View>
      </View>
    </View>
  );
};

const userButton = (color: string): TextStyle => ({
  color,
  fontSize: 18,
  paddingStart: 8,
  paddingEnd: 5,
  borderWidth: 2,
  borderRadius: 10,
  borderColor: color,
  marginLeft: 5,
  fontWeight: 'bold',
});

const styles = StyleSheet.create({
  createButton: {
    alignSelf: 'flex-end',
    color: 'white',
    backgroundColor: purple,
    borderRadius: 10,
    fontSize: 20,
    padding: 7,
    margin: 5,
    marginEnd: 10,
  },
  addedUserContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  user: {
    fontSize: 20,
  },
  addedUserRemove: userButton('red'),
  searchedUserContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 500,
    overflow: 'scroll',
    flexDirection: 'column',
  },
  searchedUser: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
  },
  searchedUserAdd: userButton('green'),
});

export default CreateGroup;
