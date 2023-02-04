import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {StyledContainer, TitleText} from './SettingsItem.styles';

// TODO : Change so that "change account details" is one button, opens new screen
// todo: where u can input data for: username,password and email -> click submit changes button
// todo: -> update firebase

export const SettingsItem = ({
  title,
  isThemeChange,
  isDeleteAccount,
  onPress,
}) => {
  return (
    <StyledContainer isDeleteAccount={isDeleteAccount} onPress={onPress}>
      <TitleText>{title}</TitleText>
      <Icon
        name={isDeleteAccount ? 'close-sharp' : 'chevron-forward-sharp'}
        size={15}
        color={'white'}
      />
    </StyledContainer>
  );
};
