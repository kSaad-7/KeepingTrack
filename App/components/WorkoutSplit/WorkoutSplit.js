import React from 'react';

import {DayName, StyledTouchable, StyledView} from './WorkoutSplit.styles';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../assets/appColors/Colors';

export const WorkoutSplit = ({data, onDayClick}) => {
  return data.map(day => {
    const {name, docId} = day;
    return (
      //A workout day
      <StyledTouchable key={docId} onPress={() => onDayClick(day)}>
        <StyledView>
          {!(name === 'Rest') && <DayName>{name}</DayName>}
          {name === 'Rest' && (
            <Icon
              name={'battery-charging-outline'}
              size={30}
              color={COLORS.offWhite}
            />
          )}
        </StyledView>
      </StyledTouchable>
    );
  });
};
