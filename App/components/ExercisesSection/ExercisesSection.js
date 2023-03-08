/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';

import LinearGradient from 'react-native-linear-gradient';

import IonIcon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../assets/appColors/Colors';

import {
  BoldInfoText,
  ExerciseName,
  InfoView,
  ExerciseNameView,
  StyledText,
  StyledTouchable,
} from './ExercisesSection.styles';

import {autoCompleteDataSet} from '../../assets/data/autoCompleteDataSet';
import {WorkoutContext} from '../../ContextCreator';

export const ExercisesSection = ({
  exercises,
  setShowInputModal,
  setIsEditMode,
  setIsCustomExercise,
}) => {
  const {setCurrentExercise} = useContext(WorkoutContext);
  return exercises.map(exercise => {
    const {weight, docId, name, sets, reps, isCustom} = exercise;

    const findExerciseInDataSet = () => {
      const exerciseInDataSet = autoCompleteDataSet.find(e => e.title === name);
      return exerciseInDataSet;
    };

    const handleExercisePress = async selectedExercise => {
      const exerciseInDataSet = findExerciseInDataSet();
      setCurrentExercise({
        ...selectedExercise,
        dataSetId: exerciseInDataSet?.id,
      });
      if (isCustom) {
        setIsCustomExercise(true);
      } else {
        setIsCustomExercise(false);
      }
      setIsEditMode(true);
      setShowInputModal(true);
    };
    return (
      //Exercise item
      <StyledTouchable
        key={docId}
        onPress={() => handleExercisePress(exercise)}>
        <LinearGradient
          // colors={['#3B00DB', COLORS.blue]}
          colors={['#3a1c71', COLORS.blue]}
          style={{
            height: '100%',
            borderRadius: 8,
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <ExerciseNameView>
            <ExerciseName>{name}</ExerciseName>
          </ExerciseNameView>
          <InfoView>
            <StyledText>
              <BoldInfoText>{weight}</BoldInfoText> KG
            </StyledText>
            <StyledText>
              <BoldInfoText>{sets}</BoldInfoText> {sets === 1 ? 'Set' : 'Sets'}
              {'    x    '}
              <BoldInfoText>{reps}</BoldInfoText> {reps === 1 ? 'Rep' : 'Reps'}
            </StyledText>
          </InfoView>
        </LinearGradient>
      </StyledTouchable>
    );
  });
};
