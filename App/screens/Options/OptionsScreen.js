import React, {useContext, useState} from 'react';

import {COLORS} from '../../assets/appColors/Colors';

import {UserContext, WorkoutContext} from '../../ContextCreator';

import {SettingsItem} from '../../components/SettingsItem/SettingsItem';

import {CustomAlert} from '../../components/CustomAlert/CustomAlert';

import {
  StyledContainer,
  ScreenTitle,
  ThemeView,
  SettingHeaderText,
  AccountView,
} from './OptionsScreen.styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const OptionsScreen = ({navigation}) => {
  const [showOptionsAlert, setShowOptionsAlert] = useState(false);

  const {setUser, user} = useContext(UserContext);
  const {setCurrentPreMadePlan} = useContext(WorkoutContext);

  const handleDeleteAccountPress = () => {
    navigation.navigate('DeleteAccount');
  };

  const deleteUserToken = async () => {
    try {
      const value = await AsyncStorage.removeItem('userToken');
      setUser(null);
      setCurrentPreMadePlan({});
      console.log(value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAlertAnswer = userChoice => {
    if (userChoice === 'no') {
      setShowOptionsAlert(false);
    } else {
      deleteUserToken();
      navigation.navigate('Login');
      setShowOptionsAlert(false);
    }
  };

  const handleSignOutPress = () => {
    setShowOptionsAlert(true);
  };

  const handleChangeDetailsPress = () => {
    navigation.navigate('ChangeDetails');
  };

  return (
    <StyledContainer>
      <ScreenTitle>Settings</ScreenTitle>
      <ThemeView>
        <SettingHeaderText>Theme</SettingHeaderText>
        <SettingsItem title="Switch theme" iconName={'chevron-forward-sharp'} />
      </ThemeView>
      <AccountView>
        <SettingHeaderText>Account</SettingHeaderText>
        <SettingsItem
          title="Change account details"
          onPress={handleChangeDetailsPress}
          iconName={'chevron-forward-sharp'}
        />
        <SettingsItem
          title="Sign out"
          onPress={handleSignOutPress}
          iconName={'log-out-outline'}
        />
        {showOptionsAlert && (
          <CustomAlert
            alertTitle={user.userName}
            alertText={'Are you sure you want to sign out?'}
            handleAlertAnswer={handleAlertAnswer}
          />
        )}
        <SettingsItem
          title="Delete account"
          iconName="close-sharp"
          onPress={handleDeleteAccountPress}
          style={{backgroundColor: COLORS.red}}
        />
      </AccountView>
    </StyledContainer>
  );
};
