import React, {useContext, useState} from 'react';
import {Text, View, Button, SafeAreaView} from 'react-native';

import {UserContext} from '../../ContextCreator';

import {SettingsItem} from '../../components/SettingsItem/SettingsItem';

import {CustomAlert} from '../../components/CustomAlert/CustomAlert';

import {
  StyledContainer,
  ScreenTitle,
  ThemeView,
  SettingHeaderText,
  AccountView,
} from './OptionsScreen.styles';

// TODO: Use figma to make the buttons, have one custom component + use props to display text
// TODO: Make sure 'Sign out' button has different styles.

export const OptionsScreen = ({navigation}) => {
  const [showAlert, setShowAlert] = useState(false);
  const {setUser, user} = useContext(UserContext);

  const handleDeleteAccountPress = () => {
    navigation.navigate('DeleteAccount');
  };

  const handleAlertAnswer = userChoice => {
    if (userChoice === 'no') {
      setShowAlert(false);
    } else {
      setUser(null);
      navigation.navigate('Login');
      setShowAlert(false);
    }
  };

  const handleSignOutPress = () => {
    setShowAlert(true);
  };

  const handleChangeDetailsPress = () => {
    navigation.navigate('ChangeDetails');
  };

  return (
    <StyledContainer>
      <Button title="back" onPress={() => navigation.navigate('Login')} />
      <ScreenTitle>Settings</ScreenTitle>
      <ThemeView>
        <SettingHeaderText>Theme</SettingHeaderText>
        <SettingsItem title="Switch theme" />
      </ThemeView>
      <AccountView>
        <SettingHeaderText>Account</SettingHeaderText>
        <SettingsItem
          title="Change account details"
          onPress={handleChangeDetailsPress}
        />
        <SettingsItem title="Sign out" onPress={handleSignOutPress} />
        {showAlert && (
          <CustomAlert
            alertTitle={user.userName}
            alertText={'Are you sure you want to sign out?'}
            handleAlertAnswer={handleAlertAnswer}
          />
        )}
        <SettingsItem
          title="Delete account"
          isDeleteAccount
          onPress={handleDeleteAccountPress}
        />
      </AccountView>
    </StyledContainer>
  );
};
