import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

const ErrorText = ({ error }) => {
  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#f75c5c',
    borderWidth: 1,
    borderColor: 'red',
  },
});

ErrorText.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorText;
