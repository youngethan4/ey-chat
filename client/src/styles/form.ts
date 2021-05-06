import { StyleSheet } from 'react-native';
import { pink, purple } from './colors';

export const formStyles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: purple,
    marginBottom: 30,
    paddingTop: 5,
    paddingBottom: 0,
    fontSize: 18,
  },
  textInputOnFocus: {
    borderBottomColor: pink,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    padding: 5,
  },
  fieldError: {
    alignItems: 'flex-start',
  },
  error: {
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: purple,
    color: 'white',
    padding: 5,
    borderRadius: 10,
  },
});
