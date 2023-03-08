import React from 'react';
import {View} from 'react-native';
import {Container, Label, StyledInput} from './ModalInput.styles';

export const ModalInput = ({label, value, onChangeText, defaultValue}) => {
  return (
    <Container>
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        defaultValue={defaultValue}
      />
      <View style={{justifyContent: 'center'}}>
        <Label>{label}</Label>
      </View>
    </Container>
  );
};
