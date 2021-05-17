import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { signout } from '../redux/actions/auth-actions';
import { useAppDispatch } from '../redux/store/store';
import { pink, purple } from '../styles/colors';

type Props = {
  modalVisible: boolean;
  setModalVisible: Function;
};

const SettingsModal: React.FC<Props> = ({ modalVisible, setModalVisible }) => {
  const dispatch = useAppDispatch();
  return (
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
            <Text style={[styles.modalButton, styles.closeButton]}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default SettingsModal;
