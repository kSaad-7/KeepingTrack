import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {COLORS} from '../../assets/appColors/Colors';
import {Container, Label, StyledInput} from './ModalInput.styles';

export const ModalInput = ({label, value, onChangeText}) => {
  return (
    <Container>
      <StyledInput
        value={value}
        placeholderTextColor="rgba(255, 255, 255, 0.1)"
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      <View style={{justifyContent: 'center'}}>
        <Label>{label}</Label>
      </View>
    </Container>
  );
};
