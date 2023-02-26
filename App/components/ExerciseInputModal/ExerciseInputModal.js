/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Modal, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/Ionicons';
import {ModalInput} from '../ModalInput/ModalInput';

import {
  BackTouchable,
  MainContent,
  Container,
  ModalContent,
  TopHeaderView,
  ModalTitleView,
  TitleText,
  StyledView,
  SearchExerciseView,
  SetsRepsView,
  ExercieseInfoView,
  ExerciseButton,
  ButtonText,
  ButtonView,
} from './ExerciseInputModal.styles';

import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {UserContext, WorkoutContext} from '../../ContextCreator';
import {autoCompleteDataSet} from '../../assets/data/autoCompleteDataSet';

import {AutoCompleteInput} from '../AutoCompleteInput/AutoCompleteInput';
import {CustomExerciseInput} from '../CustomExerciseInput/CustomExerciseInput';
import {ChangeInputTouchable} from '../ChangeInputTouchable/ChangeInputTouchable';

//TODO: Style properly while using keyboard avoiding view

export const ExerciseInputModal = ({
  showInputModal,
  setShowInputModal,
  exerciseValues,
  setExerciseValues,
  isEditMode,
  isCustomExercise,
  setIsCustomExercise,
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const {weight, sets, reps, docId, dataSetId, name} = exerciseValues;

  const {user} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const closeModal = () => {
    setShowInputModal(false);
    setExerciseValues({
      name: '',
      weight: '',
      sets: '',
      reps: '',
      docId: '',
      dataSetId: '',
    });
  };

  const handleInput = (key, input) => {
    setExerciseValues({...exerciseValues, [key]: input});
  };

  const validateInputs = () =>
    !weight || !sets || !reps || isCustomExercise ? !name : !selectedExercise;

  const saveExcersiseToFirebase = async () => {
    const exercise = {
      name: isCustomExercise ? name : selectedExercise.title,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
      isCustom: isCustomExercise,
    };

    const firebaseRef = isEditMode
      ? doc(
          db,
          'users',
          user.docId,
          'workoutSplit',
          workoutDayRef.current.docId,
          'exercises',
          docId,
        )
      : collection(
          db,
          'users',
          user.docId,
          'workoutSplit',
          workoutDayRef.current.docId,
          'exercises',
        );

    //if EditMode -> updateDoc instead of creating new one
    if (isEditMode) {
      await updateDoc(firebaseRef, exercise);
      return;
    }

    //if not EditMode -> addDoc instead of updating old one
    await addDoc(firebaseRef, {
      ...exercise,
      createdAt: Timestamp.fromDate(new Date()),
    });
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
    await saveExcersiseToFirebase();
    closeModal();
    Toast.show({
      type: 'success',
      text1: isEditMode ? 'Saved changes' : 'Added exercise',
      visibilityTime: 1500,
    });
  };

  useEffect(() => {
    const resetInputChoice = () => {
      if (isEditMode === false) {
        setIsCustomExercise(false);
        return;
      }
    };
    resetInputChoice();
  }, []);

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
              <KeyboardAvoidingView
                behavior={'padding'}
                style={{
                  flex: 1,
                  marginVertical: '5%',
                }}>
                <ModalTitleView>
                  <TitleText>
                    {isEditMode ? 'Edit Exercise' : 'Create new exercise'}
                  </TitleText>
                </ModalTitleView>
                <SearchExerciseView>
                  {!isCustomExercise ? (
                    <AutoCompleteInput
                      initalValue={isEditMode ? {id: dataSetId} : {id: ''}}
                      onSelectItem={setSelectedExercise}
                      dataSet={autoCompleteDataSet}
                    />
                  ) : (
                    <View style={{flex: 0.4}} />
                  )}
                  <ChangeInputTouchable
                    isCustomExercise={isCustomExercise}
                    setIsCustomExercise={setIsCustomExercise}
                    setSelectedExercise={setSelectedExercise}
                  />
                  {isCustomExercise && (
                    <CustomExerciseInput
                      exerciseValues={exerciseValues}
                      onChangeText={input => handleInput('name', input)}
                    />
                  )}
                </SearchExerciseView>
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
                      {isEditMode ? 'Confirm changes' : 'Create exercise'}
                    </ButtonText>
                  </ExerciseButton>
                </ButtonView>
              </KeyboardAvoidingView>
            </ModalContent>
          </StyledView>
        </Container>
        <Toast />
      </Modal>
    </GestureRecognizer>
  );
};
