import React, {useEffect, useState} from 'react';

import {Modal, View, SafeAreaView, Text, TouchableOpacity} from 'react-native';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {alphabetArray} from '../../assets/alphabetArray';

import Toast from 'react-native-toast-message';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  StyledContainer,
  BackTouchable,
  StyledView,
  Heading,
  StyledParagraph,
  RedText,
  TypeCodeText,
  Code,
  DeleteAccountButton,
  ButtonText,
} from './DeleteAccountScreen.styles';

export const DeleteAccountScreen = ({navigation}) => {
  const [deleteCode, setDeleteCode] = useState('');
  const [userCodeInput, setUserCodeInput] = useState('');

  const generateRandomCode = () => {
    if (deleteCode === '') {
      for (let i = 0; i < 7; i++) {
        let randomIndex = Math.floor(Math.random() * alphabetArray.length);
        setDeleteCode(prevState => prevState + alphabetArray[randomIndex]);
      }
    } else {
      return;
    }
  };

  let tempCode = '';
  const handleCodeInput = input => {
    tempCode += input;
    setUserCodeInput(tempCode);
  };

  const validateCodeInput = () => {
    if (userCodeInput === deleteCode) {
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteButtonPress = () => {
    const isValid = validateCodeInput();
    if (isValid) {
      console.log('Deleting account');
      // deleteAccountFirebase() -> FIREBASE DELETE DOCUMENT
    } else {
      Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text1: 'Wrong code',
        text2: 'You inputted the wrong code, please try again.',
      });
      return;
    }
  };

  useEffect(() => {
    generateRandomCode();
  }, []);

  return (
    <StyledContainer>
      <BackTouchable onPress={() => navigation.navigate('Options')}>
        <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
        <Text style={{color: '#246EE9'}}>Options</Text>
      </BackTouchable>
      <StyledView>
        <Heading>Are you sure?</Heading>
        <StyledParagraph>
          This action <RedText>cannot be undone.</RedText>
          This will permanently delete your account with no way to get it back,
          including all saved workouts.
        </StyledParagraph>
        <TypeCodeText>
          Type the following code:{'     '}
          <Code>{deleteCode}</Code>
        </TypeCodeText>
        <CustomInput
          isDeleteInput={true}
          placeholder={deleteCode}
          onChangeText={userInput => handleCodeInput(userInput)}
        />
        <DeleteAccountButton onPress={handleDeleteButtonPress}>
          <ButtonText>Delete account</ButtonText>
        </DeleteAccountButton>
      </StyledView>
    </StyledContainer>
  );
};
