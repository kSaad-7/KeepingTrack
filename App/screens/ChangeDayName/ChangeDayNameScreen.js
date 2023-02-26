import React, {useContext, useState} from 'react';
import {Text, View} from 'react-native';

import {UserContext, WorkoutContext} from '../../ContextCreator';

import IonIcon from 'react-native-vector-icons/Ionicons';

import {CustomInput} from '../../components/CustomInput/CustomInput';

import {
  BackTouchable,
  BackTouchableText,
  ConfirmButton,
  ConfirmButtonText,
  Container,
  InputView,
} from './ChangeDayNameScreen.styles';

import {db} from '../../firebase.config';
import {doc, updateDoc} from 'firebase/firestore';

import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const ChangeDayNameScreen = ({navigation}) => {
  const [newName, setNewName] = useState({newName: ''});
  const {user} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const saveChangeToFirebase = async () => {
    const workoutDayDocRef = doc(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
    );
    await updateDoc(workoutDayDocRef, {
      name: newName.newName,
    });
  };

  const validateInput = () =>
    !newName.newName || newName.newName === workoutDayRef.current.name;

  console.log(workoutDayRef.current.name);

  const handleConfirmPress = () => {
    const isNotValid = validateInput();
    if (isNotValid) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update',
        text2: 'Please make some changes to update',
        visibilityTime: 2000,
      });
      return;
    }
    saveChangeToFirebase();
    workoutDayRef.current.name = newName.newName;
    navigation.navigate('Workout');
  };

  const handleInput = input => {
    setNewName({newName: input});
  };

  //   const handleInput = (key, value) => {
  //     setLoginLog({...loginLog, [key]: value});
  //   };

  return (
    <Container>
      <BackTouchable onPress={() => navigation.navigate('Exercises')}>
        <IonIcon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
        <BackTouchableText>Exercises</BackTouchableText>
      </BackTouchable>
      <InputView>
        <CustomInput
          defaultValue={workoutDayRef.current.name}
          onChangeText={input => handleInput(input)}
        />
        <ConfirmButton onPress={handleConfirmPress}>
          <ConfirmButtonText>Confirm</ConfirmButtonText>
        </ConfirmButton>
      </InputView>
    </Container>
  );
};
