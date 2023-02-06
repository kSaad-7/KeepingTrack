import React, {useState, useContext} from 'react';

import {Text, View} from 'react-native';
import {UserContext} from '../../ContextCreator';

import {
  StyledContainer,
  BackTouchable,
  StyledView,
  DetailName,
  InputView,
  ButtonView,
  ChangeTouchable,
  ChangeText,
} from './ChangeDetails.styles';
import Icon from 'react-native-vector-icons/Ionicons';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {CustomAlert} from '../../components/CustomAlert/CustomAlert';

import {db} from '../../firebase.config';
import {updateDoc, doc} from 'firebase/firestore';

export const ChangeDetails = ({navigation}) => {
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

  console.log('USER -----', user);

  // todo: ?? FIX STATE CHANGE ?? // ?? FIX STATE CHANGE ?? // ?? FIX STATE CHANGE ?? // ?? FIX STATE CHANGE ??
  // !! !! !! !! !! !! !! !!  WORKS BUT DOESNT SAVE STATE PROPERLY !! !! !! !! !! !! !! !!
  // todo: ?? FIX STATE CHANGE ?? // ?? FIX STATE CHANGE ?? // ?? FIX STATE CHANGE ?? // ?? FIX STATE CHANGE ??

  const saveToBackend = async () => {
    const userDocRef = doc(db, 'users', `${user.docId}`);
    //If userName input is NOT empty
    if (!changeLog.userName.length < 1) {
      //Update the userDocument with the new userName in backend
      await updateDoc(userDocRef, {
        userName: changeLog.userName,
      });
      //Use setUser function to change the current users object value aswell
      setUser({...user, userName: changeLog.userName});
    }

    if (!changeLog.email.length < 1) {
      await updateDoc(userDocRef, {
        email: changeLog.email,
      });
      setUser({...user, email: changeLog.email});
    }

    if (!changeLog.password.length < 1) {
      await updateDoc(userDocRef, {
        password: changeLog.password,
      });
      setUser({...user, password: changeLog.password});
    }

    console.log('CONFIMED CHANGES - check firebase');
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
      {/* MAYBE HAVE BACK TOUCH = FUNCTION THAT FETCHES USER AGAIN. (BAD WAY TO SOLVE PROBLEM) */}
      <BackTouchable onPress={() => navigation.navigate('Options')}>
        <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
        <Text style={{color: '#246EE9'}}>Options</Text>
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
