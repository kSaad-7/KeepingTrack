import React, {useState} from 'react';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {hideNavigationBar} from 'react-native-navigation-bar-color';

import {
  StyledSafeAreaView,
  Logo,
  InputView,
  RegisterButton,
  RegisterButtonText,
  LoginView,
  AlreadyHaveAccountText,
  LoginText,
} from './SignUpScreen.styles';

import KeepTrackLogo from '../../assets/images/KeepTrackLogo.png';

// ----------------------------------------------------------------

// ?? TODO: Configure firebase and set it up.

// ----------------------------------------------------------------

export const SignUpScreen = ({navigation}) => {
  const [signUpLog, setSignUpLog] = useState({
    email: '',
    password: '',
    userName: '',
    firstName: '',
  });

  const handleInput = (key, value) => {
    console.log(signUpLog);
    setSignUpLog({...signUpLog, [key]: value});
  };

  const handleLoginPress = () => {
    hideNavigationBar(); // TODO: ?? !! ?? !! HIDE WHEN APP OPENS ?? ?? !!
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    // isValid = validateInputs() -> Check if all inputs are fine
    // storeToFirebase() -> Function that stores it all to firebase
    // setUser from context to the new object
    // start session
    ///navigate to homeTabs
    alert('New account');
  };

  return (
    <StyledSafeAreaView>
      <Logo source={KeepTrackLogo} />
      <InputView>
        <CustomInput
          onChangeText={userInput => handleInput('firstName', userInput)}
          value={signUpLog.firstName}
          placeholder="First name"
          isRegister
        />
        <CustomInput
          onChangeText={userInput => handleInput('userName', userInput)}
          value={signUpLog.userName}
          placeholder="Username"
          secureTextEntry={true}
          isRegister
        />
        <CustomInput
          onChangeText={userInput => handleInput('email', userInput)}
          value={signUpLog.email}
          placeholder="Email"
          secureTextEntry={true}
          isRegister
        />
        <CustomInput
          onChangeText={userInput => handleInput('password', userInput)}
          value={signUpLog.password}
          placeholder="Password"
          secureTextEntry={true}
          isRegister
        />
        <RegisterButton onPress={handleRegisterPress}>
          <RegisterButtonText>Create a new account</RegisterButtonText>
        </RegisterButton>
      </InputView>
      <LoginView>
        <AlreadyHaveAccountText>
          Already have an account?{' '}
          <LoginText onPress={handleLoginPress}>Login</LoginText>
        </AlreadyHaveAccountText>
      </LoginView>
    </StyledSafeAreaView>
  );
};
