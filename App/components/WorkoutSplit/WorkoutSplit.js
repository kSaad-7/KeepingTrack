import React from 'react';

import {
  DayName,
  RestIconView,
  StyledTouchable,
  StyledView,
} from './WorkoutSplit.styles';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <RestIconView>
              <Icon name={'bed'} size={35} color={COLORS.offWhite} />
              <MaterialCommunityIcon
                name={'sleep'}
                size={20}
                color={COLORS.offWhite}
              />
            </RestIconView>
          )}
        </StyledView>
      </StyledTouchable>
    );
  });
};

// BUILD APP AGAIN
