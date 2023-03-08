import React, {useContext, useEffect, useState} from 'react';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {alphabetArray} from '../../assets/data/alphabetArray';

import Toast from 'react-native-toast-message';

import Icon from 'react-native-vector-icons/Ionicons';

import {db} from '../../firebase.config';
import {deleteDoc, doc} from 'firebase/firestore';

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
  BackTouchableText,
} from './DeleteAccountScreen.styles';

import {UserContext} from '../../ContextCreator';

export const DeleteAccountScreen = ({navigation}) => {
  const [deleteCode, setDeleteCode] = useState('');
  const [userCodeInput, setUserCodeInput] = useState('');

  const {user} = useContext(UserContext);

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

  const deleteAccount = async () => {
    const userDocRef = doc(db, 'users', `${user.docId}`);
    //Delete document
    await deleteDoc(userDocRef);
  };

  const handleDeleteButtonPress = () => {
    const isValid = validateCodeInput();
    if (isValid) {
      Toast.show({
        visibilityTime: 2500,
        type: 'success',
        text1: 'Account deleted',
        text2: `${user.userName} has been permenantly deleted.`,
      });
      navigation.navigate('Login');
      deleteAccount();
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
        <BackTouchableText>Options</BackTouchableText>
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
