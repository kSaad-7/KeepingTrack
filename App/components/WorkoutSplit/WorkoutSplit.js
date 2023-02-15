import React from 'react';

import {DayName, StyledTouchable} from './WorkoutSplit.styles';
import LinearGradient from 'react-native-linear-gradient';

export const WorkoutSplit = ({data, onDayClick}) => {
  return data.map(day => {
    const {name, docId} = day;
    return (
      //A workout day
      <StyledTouchable key={docId} onPress={() => onDayClick(day)}>
        <LinearGradient
          // colors={['#7474BF', '#348AC7']}
          colors={['#232526', '#41454f']}
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: 10,
            borderRadius: 7,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <DayName>{name}</DayName>
        </LinearGradient>
      </StyledTouchable>
    );
  });
};
