import React from 'react';
import {Container, StyledInput} from './CustomExerciseInput.styles';

export const CustomExerciseInput = ({onChangeText, exerciseValues}) => {
  return (
    <Container>
      <StyledInput
        placeholder="Custom exercise"
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        onChangeText={onChangeText}
        value={exerciseValues?.name}
      />
    </Container>
  );
};
