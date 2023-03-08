/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Modal, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/Ionicons';
import {ModalInput} from '../ModalInput/ModalInput';

import {
  BackTouchable,
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
  DeleteButton,
} from './ExerciseInputModal.styles';

import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {
  addDoc,
  collection,
  deleteDoc,
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

export const ExerciseInputModal = ({
  showInputModal,
  setShowInputModal,
  isEditMode,
  isCustomExercise,
  setIsCustomExercise,
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const {user} = useContext(UserContext);
  const {workoutDayRef, setCurrentExercise, currentExercise} =
    useContext(WorkoutContext);

  const {weight, sets, reps, docId, dataSetId, name} = currentExercise;

  const closeModal = () => {
    setShowInputModal(false);
    setCurrentExercise({
      name: '',
      weight: '',
      sets: '',
      reps: '',
      docId: '',
      dataSetId: '',
    });
  };

  const handleInput = (key, input) => {
    setCurrentExercise(prevState => ({...prevState, [key]: input}));
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

  const handleNewExercisePress = async () => {
    const isNotValid = validateInputs();
    if (isNotValid) {
      Toast.show({
        type: 'error',
        text1: 'Wrong details',
        text2: 'Please fill in all the fields properly',
      });
      return;
    } else if (weight?.length > 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid weight',
        text2: 'You cannot have that high of a weight.',
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

  const handleDeletePress = async () => {
    const exercisesRef = doc(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
      'exercises',
      docId,
    );
    try {
      await deleteDoc(exercisesRef);
    } catch (e) {
      console.log(e);
      return;
    }
    closeModal();
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
                      defaultValue={isEditMode ? `${reps}` : ''}
                    />
                    <SetsRepsView>
                      <ModalInput
                        label="Sets"
                        value={`${sets}`}
                        onChangeText={input => handleInput('sets', input)}
                        defaultValue={isEditMode ? `${reps}` : ''}
                      />
                      <ModalInput
                        value={`${reps}`}
                        label="Reps"
                        onChangeText={input => handleInput('reps', input)}
                        defaultValue={isEditMode ? `${reps}` : ''}
                      />
                    </SetsRepsView>
                  </View>
                </ExercieseInfoView>
                <ButtonView>
                  <ExerciseButton onPress={handleNewExercisePress}>
                    <ButtonText>
                      {isEditMode ? 'Confirm changes' : 'Create exercise'}
                    </ButtonText>
                  </ExerciseButton>
                  {isEditMode && (
                    <DeleteButton onPress={handleDeletePress}>
                      <ButtonText>Delete exercise</ButtonText>
                    </DeleteButton>
                  )}
                </ButtonView>
              </KeyboardAvoidingView>
            </ModalContent>
          </StyledView>
          <Toast />
        </Container>
      </Modal>
    </GestureRecognizer>
  );
};
