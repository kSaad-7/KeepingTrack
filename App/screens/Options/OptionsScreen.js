import React, {useContext, useState} from 'react';
import {Text, View, Button, SafeAreaView} from 'react-native';

import {UserContext} from '../../ContextCreator';

import {SettingsItem} from '../../components/SettingsItem/SettingsItem';

import {SignOutAlert} from '../../components/SignOutAlert/SignOutAlert';

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

  const onNoAnswer = () => {
    console.log('NO');
    setShowAlert(false);
  };

  const onYesAnswer = () => {
    setUser(null);
    navigation.navigate('Login');
    setShowAlert(false);
  };

  const handleSignOutPress = () => {
    setShowAlert(true);
  };

  return (
    <StyledContainer>
      <ScreenTitle>Settings</ScreenTitle>
      <Button
        title="Hello"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <ThemeView>
        <SettingHeaderText>Theme</SettingHeaderText>
        <SettingsItem title="Switch theme" />
      </ThemeView>
      <AccountView>
        <SettingHeaderText>Account</SettingHeaderText>
        <SettingsItem title="Change account details" />
        <SettingsItem title="Sign out" onPress={handleSignOutPress} />
        {showAlert && (
          <SignOutAlert
            setShowAlert={setShowAlert}
            onNoAnswer={onNoAnswer}
            onYesAnswer={onYesAnswer}
            user={user}
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
