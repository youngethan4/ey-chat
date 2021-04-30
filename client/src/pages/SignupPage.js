import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import CredentailsFrom from '../components/CredentialsForm';
import { signup } from '../redux/actions/auth-actions';
import { styles } from './styles/auth-pages';

// eslint-disable-next-line no-shadow
const SignupPage = ({ signup, didSignupFail, isSignedin }) => {
  const buttonTitle = 'Sign Up';
  const onSubmit = credentials => {
    signup(credentials);
  };

  return (
    <View>
      <Text style={styles.title}>Sign up with ey-chat</Text>
      <View style={styles.container}>
        <CredentailsFrom
          onSubmit={onSubmit}
          buttonTitle={buttonTitle}
          didError={didSignupFail}
        />
      </View>
    </View>
  );
};

SignupPage.propTypes = {
  didSignupFail: PropTypes.bool.isRequired,
  isSignedin: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  didSignupFail: state.auth.didSignupFail,
  isSignedin: state.auth.isSignedin,
});

const mapDispatchToProps = { signup };

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
