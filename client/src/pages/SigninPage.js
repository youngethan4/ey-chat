import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import CredentailsFrom from '../components/CredentialsForm';
import { signin } from '../redux/actions/auth-actions';
import { styles } from './styles/auth-pages';

// eslint-disable-next-line no-shadow
const SigninPage = ({ signin, didSigninFail, isSignedin }) => {
  const buttonTitle = 'Sign In';
  const onSubmit = credentials => {
    signin(credentials);
  };

  return (
    <View>
      <Text style={styles.title}>Welcome back!</Text>
      <View style={styles.container}>
        <CredentailsFrom
          onSubmit={onSubmit}
          buttonTitle={buttonTitle}
          didError={didSigninFail}
        />
      </View>
    </View>
  );
};

SigninPage.propTypes = {
  didSigninFail: PropTypes.bool.isRequired,
  isSignedin: PropTypes.bool.isRequired,
  signin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  didSigninFail: state.auth.didSigninFail,
  isSignedin: state.auth.isSignedin,
});

const mapDispatchToProps = { signin };

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
