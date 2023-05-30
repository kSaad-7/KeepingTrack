import React from 'react';

import {
  BlueText,
  ButtonText,
  ButtonView,
  Header,
  ImageBackgroundContainer,
  LoginButton,
  RegisterButton,
  StyledHeaderView,
  StyledText,
  StyledView,
} from './StartScreen.styles';

export const StartScreen = ({navigation}) => {
  return (
    <ImageBackgroundContainer
      source={require('../../assets/images/start4.jpg')}
      resizeMode="cover">
      <Header>
        <StyledHeaderView>
          <BlueText>KeepTrack</BlueText>
        </StyledHeaderView>
      </Header>
      <ButtonView>
        <StyledView>
          <StyledText>
            Better Tracking, {'                           '}Better Workouts.
          </StyledText>
        </StyledView>
        <LoginButton onPress={() => navigation.navigate('Login')}>
          <ButtonText>Login</ButtonText>
        </LoginButton>
        <RegisterButton onPress={() => navigation.navigate('SignUp')}>
          <ButtonText>Create a new account</ButtonText>
        </RegisterButton>
      </ButtonView>
    </ImageBackgroundContainer>
  );
};
