import React from 'react';
import {StyledTextInput} from './CustomInput.styles';

export const CustomInput = ({
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  isRegister,
  isDeleteInput,
  style,
}) => {
  return (
    <StyledTextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="rgba(255, 255, 255, 0.2)"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      isRegister={isRegister}
      isDeleteInput={isDeleteInput}
      style={style}
      autoComplete="off"
    />
  );
};
