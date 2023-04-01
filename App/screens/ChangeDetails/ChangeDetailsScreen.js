/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';

import {UserContext} from '../../ContextCreator';

import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {
  StyledContainer,
  BackTouchable,
  BackTouchableText,
  StyledView,
  DetailName,
  InputView,
  ButtonView,
  ChangeTouchable,
  ChangeText,
} from './ChangeDetailsScreen.styles';

import Icon from 'react-native-vector-icons/Ionicons';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {CustomAlert} from '../../components/CustomAlert/CustomAlert';

import {db} from '../../firebase.config';
import {updateDoc, doc} from 'firebase/firestore';

export const ChangeDetailsScreen = ({navigation}) => {
  const [changeLog, setChangeLog] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const {user, setUser} = useContext(UserContext);

  const handleInputChange = (key, value) => {
    setChangeLog({...changeLog, [key]: value});
  };

  const handleConfirmChangesPress = () => {
    setShowConfirmAlert(true);
  };

  const saveToBackend = async () => {
    const userDocRef = doc(db, 'users', `${user.docId}`);
    //If userName input is NOT empty
    if (!changeLog.userName.length < 1) {
      //Update the userDocument with the new userName in backend
      await updateDoc(userDocRef, {
        userName: changeLog.userName,
      });
      //Use setUser function to change the current users object value aswell
      setUser(prevState => ({...prevState, userName: changeLog.userName}));
    }

    if (!changeLog.email.length < 1) {
      await updateDoc(userDocRef, {
        email: changeLog.email,
      });
      setUser(prevState => ({...prevState, email: changeLog.email}));
    }

    if (!changeLog.password.length < 1) {
      await updateDoc(userDocRef, {
        password: changeLog.password,
      });
      setUser(prevState => ({...prevState, password: changeLog.password}));
    }
    Toast.show({
      type: 'success',
      text1: 'Account details updated.',
    });
    navigation.navigate('Options');
  };

  const handleAlertAnswer = userChoice => {
    if (userChoice === 'no') {
      setShowConfirmAlert(false);
    } else {
      saveToBackend();
      setShowConfirmAlert(false);
    }
  };

  return (
    <StyledContainer>
      <BackTouchable onPress={() => navigation.navigate('Options')}>
        <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
        <BackTouchableText>Options</BackTouchableText>
      </BackTouchable>
      <InputView>
        <StyledView>
          <DetailName>Username</DetailName>
          <CustomInput
            placeholder={user.userName}
            style={{height: '40%'}}
            onChangeText={userInput => handleInputChange('userName', userInput)}
            value={changeLog.userName}
          />
        </StyledView>
        <StyledView>
          <DetailName>Email</DetailName>
          <CustomInput
            placeholder={user.email}
            style={{height: '40%'}}
            onChangeText={userInput => handleInputChange('email', userInput)}
            value={changeLog.email}
          />
        </StyledView>
        <StyledView>
          <DetailName>Password</DetailName>
          <CustomInput
            placeholder={user.password}
            style={{height: '40%'}}
            onChangeText={userInput => handleInputChange('password', userInput)}
            value={changeLog.password}
          />
        </StyledView>
      </InputView>
      <ButtonView>
        <ChangeTouchable onPress={handleConfirmChangesPress}>
          <ChangeText>Confirm changes</ChangeText>
        </ChangeTouchable>
      </ButtonView>
      {showConfirmAlert && (
        <CustomAlert
          alertTitle={'Confirm'}
          alertText={''}
          handleAlertAnswer={handleAlertAnswer}
        />
      )}
    </StyledContainer>
  );
};
