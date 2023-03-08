import React, {useContext} from 'react';
import {WorkoutContext} from '../../ContextCreator';
import {Container, StyledInput} from './CustomExerciseInput.styles';

export const CustomExerciseInput = ({onChangeText}) => {
  const {currentExercise} = useContext(WorkoutContext);
  return (
    <Container>
      <StyledInput
        placeholder="Custom exercise"
        placeholderTextColor="rgba(255, 255, 255, 0.2)"
        onChangeText={onChangeText}
        value={currentExercise?.name}
      />
    </Container>
  );
};
