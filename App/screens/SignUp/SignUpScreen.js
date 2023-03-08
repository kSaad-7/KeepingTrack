import React, {useState, useContext} from 'react';

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

import {collection, addDoc, setDoc, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {UserContext} from '../../ContextCreator';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';

// ----------------------------------------------------------------

// ?? TODO: Configure firebase and set it up.

// ----------------------------------------------------------------

export const SignUpScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpLog, setSignUpLog] = useState({
    email: '',
    password: '',
    userName: '',
    firstName: '',
  });

  const {setUser} = useContext(UserContext);

  const handleInput = (key, value) => {
    setSignUpLog({...signUpLog, [key]: value});
  };

  const storeNewUserFirestore = async () => {
    const userData = {
      firstName: signUpLog.firstName,
      userName: signUpLog.userName,
      password: signUpLog.password,
      email: signUpLog.email,
      achievements: [],
      stats: {
        dumbellChestPressMax: 0,
        squatMax: 0,
        benchPressMax: 0,
        totalSetsCompleted: 0,
      },
    };
    const newUserDocRef = await addDoc(collection(db, 'users'), userData);
    setUser({...userData, docId: newUserDocRef.id});

    // WorkoutSplit subcollection
    const workoutSplitSubCollectionRef = collection(
      db,
      'users',
      newUserDocRef.id,
      'workoutSplit',
    );
    // Make 7 documents, one for each day in the workout split.
    for (let i = 1; i < 8; i++) {
      await setDoc(doc(workoutSplitSubCollectionRef, `day${i}`), {
        name: `Day ${i}`,
        docId: `day${i}`,
      });
    }
  };

  const handleLoginPress = async () => {
    hideNavigationBar(); // TODO: ?? !! ?? !! HIDE WHEN APP OPENS ?? ?? !!
    navigation.navigate('Login');
  };

  const validateInputs = () =>
    !signUpLog.email ||
    !signUpLog.firstName ||
    !signUpLog.password ||
    !signUpLog.userName;

  const handleRegisterPress = async () => {
    const isNotValid = validateInputs();
    if (isNotValid) {
      Toast.show({
        type: 'error',
        text1: 'Wrong details',
        text2: 'Please fill in all the fields properly',
      });
      return;
    }
    setIsLoading(true);
    Toast.show({
      type: 'success',
      text1: 'Creating account...',
    });
    await storeNewUserFirestore();
    Toast.hide();
    navigation.navigate('HomeTabs');
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
          isRegister
        />
        <CustomInput
          onChangeText={userInput => handleInput('email', userInput)}
          value={signUpLog.email}
          placeholder="Email"
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
