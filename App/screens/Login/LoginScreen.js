/* eslint-disable no-alert */
import React, {useState, useContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

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

import {UserContext} from '../../ContextCreator';

import {db} from '../../firebase.config';
import {collection, query, where, getDocs, doc} from 'firebase/firestore';

import Toast from 'react-native-toast-message';

// ----------------------------------------------------------------

// ?? TODO: Configure firebase and set it up.

// ----------------------------------------------------------------

export const LoginScreen = ({navigation}) => {
  const [loginLog, setLoginLog] = useState({email: '', password: ''});
  const {setUser} = useContext(UserContext);

  const handleInput = (key, value) => {
    setLoginLog({...loginLog, [key]: value});
  };

  const storeUserToken = async value => {
    try {
      await AsyncStorage.setItem('userToken', value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLoginPress = async () => {
    const loginQuery = query(
      collection(db, 'users'),
      where('email', '==', loginLog.email),
      where('password', '==', loginLog.password),
    );
    const querySnapshot = await getDocs(loginQuery);
    if (querySnapshot.empty) {
      Toast.show({
        type: 'error',
        text1: 'Wrong details.',
        text2: 'Your email or password is wrong please try again.',
      });
      return;
    }

    const user = querySnapshot.docs[0];
    const userData = user.data();

    if (!user) {
      return;
    } else if (user) {
      storeUserToken(user.id);
      setUser({...userData, docId: user.id});
      navigation.navigate('HomeTabs');
      setLoginLog({email: null, password: null});
    }
  };

  return (
    <StyledSafeAreaView>
      <Logo source={KeepTrackLogo} />
      <InputView>
        <CustomInput
          onChangeText={userInput => handleInput('email', userInput)}
          value={loginLog?.email}
          placeholder="Email"
          keyboardType="email-address"
        />
        <CustomInput
          onChangeText={userInput => handleInput('password', userInput)}
          value={loginLog?.password}
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
