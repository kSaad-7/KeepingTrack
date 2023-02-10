import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {StyledContainer, TitleText} from './SettingsItem.styles';

export const SettingsItem = ({
  title,
  isThemeChange,
  iconName,
  onPress,
  style,
}) => {
  return (
    <StyledContainer onPress={onPress} style={style}>
      <TitleText>{title}</TitleText>
      <Icon name={iconName} size={15} color={'white'} />
    </StyledContainer>
  );
};
