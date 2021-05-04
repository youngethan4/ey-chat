import { StyleSheet } from 'react-native';
import { pink, purple } from './colors';

export const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: purple,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  container: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  link: {
    borderBottomColor: pink,
    borderBottomWidth: 1,
    color: pink,
    alignSelf: 'center',
    marginBottom: 25,
    fontSize: 18,
  },
});
