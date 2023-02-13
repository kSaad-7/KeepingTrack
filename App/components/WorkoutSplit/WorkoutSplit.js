import React, {useContext} from 'react';

import {DayName, StyledTouchable} from './WorkoutSplit.styles';

export const WorkoutSplit = ({data, onDayClick}) => {
  return data.map(day => {
    const {name, docId} = day;
    return (
      //A workout day
      <StyledTouchable key={docId} onPress={() => onDayClick(day)}>
        <DayName>{name}</DayName>
      </StyledTouchable>
    );
  });
};
