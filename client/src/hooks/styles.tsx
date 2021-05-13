import React from 'react';
import { View } from 'react-native';
import ErrorText from '../components/ErrorText';
import { RequestError } from '../redux/actions/request-errors';

export const useStyledErrors = (errors: RequestError[]) => {
  return (
    <View>
      {errors
        .filter(e => !e.field)
        .map((e, key) => (
          <ErrorText error={e.message} key={key} />
        ))}
    </View>
  );
};
