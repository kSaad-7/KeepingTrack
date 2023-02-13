import React from 'react';
import {Text, View} from 'react-native';

import {
  BlueInfoText,
  ExerciseName,
  InfoView,
  ExerciseNameView,
  StyledText,
  StyledTouchable,
} from './ExercisesSection.styles';

export const ExercisesSection = ({exercises}) => {
  return exercises.map(exercise => {
    const {weight, docId, name, sets, reps} = exercise;
    return (
      //Exercise item
      <StyledTouchable key={docId} onPress={() => console.log('hello')}>
        <ExerciseNameView>
          <ExerciseName>{name}</ExerciseName>
        </ExerciseNameView>
        <InfoView>
          <StyledText>
            <BlueInfoText>{weight}</BlueInfoText> KG
          </StyledText>
          <StyledText>
            <BlueInfoText>{sets}</BlueInfoText> sets
            {'   x   '}
            <BlueInfoText>{reps}</BlueInfoText> reps
          </StyledText>
        </InfoView>
      </StyledTouchable>
    );
  });
};
