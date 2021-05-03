import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';

export type Props = {
  error: string;
};

const ErrorText: React.FC<Props> = ({ error }) => {
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
