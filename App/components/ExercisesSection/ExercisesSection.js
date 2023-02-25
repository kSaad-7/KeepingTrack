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
  setIsCustomExercise,
}) => {
  return exercises.map(exercise => {
    const {weight, docId, name, sets, reps, isCustom} = exercise;

    const findExerciseInDataSet = () => {
      const exerciseInDataSet = autoCompleteDataSet.find(e => e.title === name);
      return exerciseInDataSet;
    };

    const handleExercisePress = async () => {
      const exerciseInDataSet = findExerciseInDataSet();
      const exerciseValuesObject = {
        name: name,
        weight: weight,
        sets: sets,
        reps: reps,
        docId: docId,
        dataSetId: exerciseInDataSet?.id,
      };
      if (isCustom) {
        setIsCustomExercise(true);
      } else {
        setIsCustomExercise(false);
      }
      setExerciseValues(exerciseValuesObject);
      setIsEditMode(true);
      setShowInputModal(true);
    };
    return (
      //Exercise item
      <StyledTouchable key={docId} onPress={handleExercisePress}>
        <LinearGradient
          // colors={['#3B00DB', COLORS.blue]}
          colors={['#6F00FF99', COLORS.blue]}
          style={{
            height: '100%',
            borderRadius: 8,
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
