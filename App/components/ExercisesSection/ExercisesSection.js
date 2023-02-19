import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../assets/appColors/Colors';

import {
  BoldInfoText,
  ExerciseName,
  InfoView,
  ExerciseNameView,
  StyledText,
  StyledTouchable,
} from './ExercisesSection.styles';

// TODO: Change background to gradient maybe, try it. !! !!!  ! !  !! !

import {autoCompleteDataSet} from '../../assets/data/autoCompleteDataSet';

export const ExercisesSection = ({
  exercises,
  setShowInputModal,
  setExerciseValues,
  setIsEditMode,
}) => {
  return exercises.map(exercise => {
    const {weight, docId, name, sets, reps} = exercise;

    const findExerciseInDataSet = () => {
      const exerciseInDataSet = autoCompleteDataSet.find(e => e.title === name);
      return exerciseInDataSet;
    };

    const handleExercisePress = async () => {
      const exerciseInDataSet = findExerciseInDataSet();
      const exerciseValuesObject = {
        name: exerciseInDataSet.title,
        weight: weight,
        sets: sets,
        reps: reps,
        docId: docId,
        dataSetId: exerciseInDataSet.id,
      };
      setExerciseValues(exerciseValuesObject);
      setIsEditMode(true);
      setShowInputModal(true);
    };
    return (
      //Exercise item
      <StyledTouchable key={docId} onPress={handleExercisePress}>
        <LinearGradient
          colors={['#0e174f', '#1d2b85']}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: COLORS.blue,
          }}
          start={{x: 0, y: 0}}
          end={{x: 0.6, y: 1}}>
          <ExerciseNameView>
            <ExerciseName>{name}</ExerciseName>
          </ExerciseNameView>
          <InfoView>
            <StyledText>
              <BoldInfoText>{weight}</BoldInfoText> KG
            </StyledText>
            <StyledText>
              <BoldInfoText>{sets}</BoldInfoText> sets
              {'   x   '}
              <BoldInfoText>{reps}</BoldInfoText> reps
            </StyledText>
          </InfoView>
        </LinearGradient>
      </StyledTouchable>
    );
  });
};
