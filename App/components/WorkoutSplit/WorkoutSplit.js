import React from 'react';

import {DayName, StyledTouchable, Gradient} from './WorkoutSplit.styles';

export const WorkoutSplit = ({data, onDayClick}) => {
  return data.map(day => {
    const {name, docId} = day;
    return (
      //A workout day
      <StyledTouchable key={docId} onPress={() => onDayClick(day)}>
        <Gradient
          colors={['#232526', '#41454f']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <DayName>{name}</DayName>
        </Gradient>
      </StyledTouchable>
    );
  });
};
