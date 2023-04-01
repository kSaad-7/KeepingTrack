import React from 'react';
import {View} from 'react-native';
import {Container, Label, StyledInput} from './ModalInput.styles';

export const ModalInput = ({label, value, onChangeText}) => {
  return (
    <Container>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      <View style={{justifyContent: 'center'}}>
        <Label>{label}</Label>
      </View>
    </Container>
  );
};
