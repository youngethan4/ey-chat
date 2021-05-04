import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

export type Props = {
  error: string;
};

const ErrorText: React.FC<Props> = ({ error }) => {
  return <Text style={styles.error}> ! {error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    margin: 2,
    padding: 3,
  },
});

ErrorText.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorText;
