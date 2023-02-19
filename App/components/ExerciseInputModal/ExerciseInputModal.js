/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
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
import {COLORS} from '../../assets/appColors/Colors';

export const ExerciseInputModal = ({
  showInputModal,
  setShowInputModal,
  exerciseValues,
  setExerciseValues,
  isEditMode,
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const {weight, sets, reps, docId, dataSetId} = exerciseValues;

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

  const validateInputs = () => !weight || !sets || !reps || !selectedExercise;

  const saveExcersiseToFirebase = async () => {
    const exercise = {
      name: selectedExercise.title,
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
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
                    {isEditMode ? 'Edit Exercise' : 'Create new exercise'}
                  </TitleText>
                </ModalTitleView>
                <SearchExercise style={{zIndex: 1}}>
                  <View style={{flex: 0.8}}>
                    <AutocompleteDropdown
                      clearOnFocus={false}
                      closeOnBlur={true}
                      closeOnSubmit={false}
                      initialValue={isEditMode ? {id: dataSetId} : {id: ''}}
                      onSelectItem={setSelectedExercise}
                      dataSet={autoCompleteDataSet}
                      suggestionsListTextStyle={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                      suggestionsListContainerStyle={{
                        backgroundColor: `${COLORS.backgroundBlack}`,
                      }}
                      textInputProps={{
                        style: {
                          backgroundColor: `${COLORS.backgroundBlack}`,
                          color: `${COLORS.offWhite}`,
                          width: '100%',
                          borderRadius: 10,
                        },
                      }}
                      inputContainerStyle={{
                        backgroundColor: `${COLORS.backgroundBlack}`,
                        borderRadius: 10,
                      }}
                      rightButtonsContainerStyle={{
                        right: 7,
                        borderRadius: 10,
                        backgroundColor: `${COLORS.backgroundBlack}`,
                      }}
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
                      {isEditMode ? 'Confirm changes' : 'Create exercise'}
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
