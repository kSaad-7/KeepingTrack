/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {COLORS} from '../../assets/appColors/Colors';

import {TouchableContainer, Label} from './AchievementsFilterTouchable.styles';

export const AchievementsFilterTouchable = ({label, onPress, filterType}) => {
  return (
    <TouchableContainer
      onPress={onPress}
      style={{
        backgroundColor: filterType === label ? COLORS.blue : '#246EE988',
      }}>
      <Label>{label}</Label>
    </TouchableContainer>
  );
};
