import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../assets/appColors/Colors';

import {
  Label,
  StlyedView,
  TouchableContainer,
} from './ChangeInputTouchable.styles';

export const ChangeInputTouchable = ({
  isCustomExercise,
  setIsCustomExercise,
  setSelectedExercise,
}) => {
  const handlePress = () => {
    setIsCustomExercise(!isCustomExercise);
    setSelectedExercise(null);
  };

  return (
    <TouchableContainer onPress={handlePress}>
      {isCustomExercise ? (
        <StlyedView>
          <Icon name={'caret-back-outline'} size={15} color={COLORS.offWhite} />

          <Label>Use dropdown</Label>
        </StlyedView>
      ) : (
        <StlyedView>
          <Label>Use custom exercise</Label>
          <Icon
            name={'caret-forward-outline'}
            size={15}
            color={COLORS.offWhite}
          />
        </StlyedView>
      )}
    </TouchableContainer>
  );
};
