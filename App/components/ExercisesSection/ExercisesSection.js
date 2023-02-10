import React from 'react';
import {Text, View} from 'react-native';

import {ExerciseName, StyledTouchable} from './ExercisesSection.styles';

export const ExercisesSection = ({exercises}) => {
  console.log('Exercises section -- : ', exercises);
  return exercises.map(exercise => {
    console.log(exercise);
    const {weight, docId, name} = exercise;
    return (
      //Exercise item
      <StyledTouchable key={docId} onPress={() => console.log('hello')}>
        <ExerciseName>
          {name}
          {'           '}
          {weight} kg
        </ExerciseName>
      </StyledTouchable>
    );
  });
};
