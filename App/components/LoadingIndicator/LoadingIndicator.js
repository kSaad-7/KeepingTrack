import React from 'react';
import {ActivityIndicator} from 'react-native';
import {StyledView} from './LoadingIndicator.styles';

export const LoadingIndicator = () => {
  return (
    <StyledView>
      <ActivityIndicator size="small" color={'#246EE9'} />
    </StyledView>
  );
};
