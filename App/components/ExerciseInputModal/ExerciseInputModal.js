/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/Ionicons';
import {ModalInput} from '../ModalInput/ModalInput';

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

import {
  BackTouchable,
  MainContent,
  Container,
  ModalContent,
  TopHeaderView,
  ModalTitleView,
  TitleText,
  StyledView,
  SearchExercise,
  SetsRepsView,
  ExercieseInfoView,
  ExerciseButton,
  ButtonText,
  ButtonView,
} from './ExerciseInputModal.styles';

import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../firebase.config';
import {UserContext, WorkoutContext} from '../../ContextCreator';

export const ExerciseInputModal = ({
  showInputModal,
  setShowInputModal,
  exerciseValues,
  setExerciseValues,
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const {name, weight, sets, reps} = exerciseValues;

  const {user} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const closeModal = () => {
    setShowInputModal(false);
    setExerciseValues({name: '', weight: '', sets: '', reps: ''});
  };

  const handleInput = (key, input) => {
    setExerciseValues({...exerciseValues, [key]: input});
  };

  const validateInputs = () => !weight || !sets || !reps;

  const saveToFirebase = async () => {
    const newExercise = {
      name: name,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
    };
    const exercisesSubCollRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
      'exercises',
    );
    await addDoc(exercisesSubCollRef, newExercise);
  };

  const handleButtonClick = async () => {
    const isNotValid = validateInputs();
    if (isNotValid) {
      Toast.show({
        type: 'error',
        text1: 'Wrong details',
        text2: 'Please fill in all the fields properly',
      });
      return;
    }
    await saveToFirebase();
    closeModal();
    Toast.show({
      type: 'success',
      text1: 'Added exercise',
      visibilityTime: 2000,
    });
  };

  let isEdit = false;
  if (weight || sets || reps) {
    isEdit = true;
  }

  return (
    <GestureRecognizer onSwipeDown={closeModal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showInputModal}
        onRequestClose={() => {
          setShowInputModal(false);
        }}>
        <Container>
          <StyledView>
            <ModalContent>
              <TopHeaderView>
                <BackTouchable onPress={closeModal}>
                  <Icon
                    name={'chevron-down-outline'}
                    size={30}
                    color={'#246EE9'}
                  />
                </BackTouchable>
              </TopHeaderView>
              <MainContent>
                <ModalTitleView>
                  <TitleText>
                    {isEdit ? 'Edit Exercise' : 'Create new exercise'}
                  </TitleText>
                </ModalTitleView>
                <SearchExercise style={{zIndex: 1}}>
                  <View style={{flex: 0.8}}>
                    <AutocompleteDropdown
                      clearOnFocus={false}
                      closeOnBlur={true}
                      closeOnSubmit={false}
                      // initialValue={{id: '2'}} // or just '2'
                      onSelectItem={setSelectedExercise}
                      dataSet={[
                        {id: '1', title: 'Alpha'},
                        {id: '2', title: 'Beta'},
                        {id: '3', title: 'Gamma'},
                      ]}
                    />
                  </View>
                </SearchExercise>
                <ExercieseInfoView>
                  <View style={{flex: 1}}>
                    <ModalInput
                      value={`${weight}`}
                      label="KG"
                      onChangeText={input => handleInput('weight', input)}
                    />
                    <SetsRepsView>
                      <ModalInput
                        label="Sets"
                        value={`${sets}`}
                        onChangeText={input => handleInput('sets', input)}
                      />
                      <ModalInput
                        value={`${reps}`}
                        label="Reps"
                        onChangeText={input => handleInput('reps', input)}
                      />
                    </SetsRepsView>
                  </View>
                </ExercieseInfoView>
                <ButtonView>
                  <ExerciseButton onPress={handleButtonClick}>
                    <ButtonText>
                      {isEdit ? 'Confirm changes' : 'Create exercise'}
                    </ButtonText>
                  </ExerciseButton>
                </ButtonView>
              </MainContent>
            </ModalContent>
          </StyledView>
        </Container>
        <Toast />
      </Modal>
    </GestureRecognizer>
  );
};
