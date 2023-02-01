import React, {useState} from 'react';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {
  StyledSafeAreaView,
  Logo,
  InputView,
  LoginButton,
  LoginButtonText,
  RegisterView,
  NeedAccountText,
  RegisterText,
} from './LoginScreen.styles';

import KeepTrackLogo from '../../assets/images/KeepTrackLogo.png';

// ----------------------------------------------------------------

// ?? TODO: Configure firebase and set it up.

// ----------------------------------------------------------------

export const LoginScreen = ({navigation}) => {
  const [loginLog, setLoginLog] = useState({email: '', password: ''});

  const handleInput = (key, value) => {
    console.log(loginLog);
    setLoginLog({...loginLog, [key]: value});
  };

  const handleLoginPress = () => {
    // isValid = validateLogin() -> firebase check
    navigation.navigate('HomeTabs');
  };

  return (
    <StyledSafeAreaView>
      <Logo source={KeepTrackLogo} />
      <InputView>
        <CustomInput
          onChangeText={userInput => handleInput('email', userInput)}
          value={loginLog.email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <CustomInput
          onChangeText={userInput => handleInput('password', userInput)}
          value={loginLog.password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <LoginButton onPress={handleLoginPress}>
          <LoginButtonText>Login</LoginButtonText>
        </LoginButton>
      </InputView>
      <RegisterView>
        <NeedAccountText>
          Don't have an account?{' '}
          <RegisterText onPress={() => navigation.navigate('SignUp')}>
            Register
          </RegisterText>
        </NeedAccountText>
      </RegisterView>
    </StyledSafeAreaView>
  );
};
