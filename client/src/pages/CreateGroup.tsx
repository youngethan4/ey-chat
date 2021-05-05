import axios from 'axios';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import { newGroup } from '../redux/actions/group-actions';
import { useAppDispatch, useAppSelector } from '../redux/store/store';

const CreateGroup = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.currentUser!.username);
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState([] as string[]);
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState([] as string[]);

  const onSubmit = () => {
    dispatch(newGroup({ name, participants: [username, ...participants] }));
  };

  const search = async () => {
    const res = await axios.get(`http://10.0.2.2/api/users?user=${searchName}`);
    console.log(res.data);
    setSearchResult(res.data);
  };

  const addedUsers = participants.map(user => (
    <View>
      <Text>{user}</Text>
      <Pressable>
        <Text>x</Text>
      </Pressable>
    </View>
  ));

  const searchedUsers = searchResult
    .filter(user => !participants.includes(user))
    .map(user => (
      <View>
        <Text>{user}</Text>
        <Pressable onPress={() => setParticipants([...participants, user])}>
          <Text>+</Text>
        </Pressable>
      </View>
    ));

  return (
    <View>
      <ChatHeader name="Create Group" />
      <View>
        <Pressable onPress={onSubmit}>
          <Text>Create</Text>
        </Pressable>
        <Text>Group name</Text>
        <TextInput onChangeText={setName} />
        <Text>Add people</Text>
        {addedUsers}
        <TextInput onChangeText={setSearchName} onEndEditing={search} />
        {searchedUsers}
      </View>
    </View>
  );
};

export default CreateGroup;
