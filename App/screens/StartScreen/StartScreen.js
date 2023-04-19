import React, {useEffect, useState} from 'react';

import styled from 'styled-components';

import {COLORS} from '../../assets/appColors/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

const ImageBackgroundContainer = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

const Header = styled.View`
  flex: 0.25;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
  // background-color: red;
`;

const StyledHeaderView = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;

const BlueText = styled.Text`
  color: ${COLORS.blue};
  font-weight: 800;
  font-size: 18px;
`;

const ButtonView = styled.View`
  flex: 0.75;
  width: 100%;
  padding-bottom: 20%;
  justify-content: flex-end;
  align-items: center;
  // background-color: orange;
`;

const StyledView = styled.View`
  justify-content: center;
  width: 95%;
  align-items: center;
`;

const StyledText = styled.Text`
  color: ${COLORS.offWhite};
  font-weight: bold;
  font-size: 35px;
  padding: 10px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  border-radius: 7px;
  padding: 13px;
  width: 80%;
  align-items: center;
  margin-top: 10%;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

const RegisterButton = styled(LoginButton)`
  border: 1px solid ${COLORS.blue};
  background-color: transparent;
  margin-top: 25px;
`;
