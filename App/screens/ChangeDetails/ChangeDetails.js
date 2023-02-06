import React, {useState} from 'react';

import {Text, View} from 'react-native';

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

export const ChangeDetails = ({navigation}) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const handleConfirmChangesPress = () => {
    setShowConfirmAlert(true);
  };

  const handleNoAnswer = () => {
    setShowConfirmAlert(false);
  };

  const handleYesAnswer = () => {
    // saveChangesFirebase() -> updates username + email +
    //  password (dont update with empty string)
    setShowConfirmAlert(false);
  };
  return (
    <StyledContainer>
      <BackTouchable onPress={() => navigation.navigate('Options')}>
        <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
        <Text style={{color: '#246EE9'}}>Options</Text>
      </BackTouchable>
      <InputView>
        <StyledView>
          <DetailName>Username</DetailName>
          <CustomInput placeholder="User name" style={{height: '40%'}} />
        </StyledView>
        <StyledView>
          <DetailName>Email</DetailName>
          <CustomInput placeholder="User name" style={{height: '40%'}} />
        </StyledView>
        <StyledView>
          <DetailName>Password</DetailName>
          <CustomInput placeholder="User name" style={{height: '40%'}} />
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
          onNoAnswer={handleNoAnswer}
          onYesAnswer={handleYesAnswer}
        />
      )}
    </StyledContainer>
  );
};
