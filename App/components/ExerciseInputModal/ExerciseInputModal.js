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
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
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

  const currentUserRef = doc(db, 'users', `${user.docId}`);

  const saveAchievements = async unlockedAchievementsArray => {
    //Go through each unlocked achievement and update it to add the user to the list of owners
    unlockedAchievementsArray.forEach(async achievement => {
      const achievementRef = doc(db, 'achievements', achievement);
      const docSnap = await getDoc(achievementRef);
      let achievementPoints = docSnap.data().points;
      console.log('POINTS NEEDED TO ADD:', achievementPoints);
      // Add user to list of owners for that achivement
      await updateDoc(achievementRef, {
        owners: arrayUnion(currentUserRef),
      });
      // Update user points
      await updateDoc(currentUserRef, {
        points: increment(achievementPoints),
      });
    });
  };

  const checkForAchievements = async () => {
    var unlockedAchievementsArray = [];
    let exerciseName = isCustomExercise
      ? name.toLowerCase()
      : selectedExercise.title.toLowerCase();

    //Replace any hyphens/dahses/white spaces with no space, so it one word now
    exerciseName = exerciseName.replace(/-|\s/g, '');
    const exerciseWeight = weight;

    switch (exerciseName) {
      case 'dumbellchestpress':
        if (exerciseWeight >= 20) {
          if (exerciseWeight >= 30) {
            if (exerciseWeight >= 50) {
              unlockedAchievementsArray.push('dumbellChestPress50');
            }
            unlockedAchievementsArray.push('dumbellChestPress30');
          }
          unlockedAchievementsArray.push('dumbellChestPress20');
        }
        await saveAchievements(unlockedAchievementsArray);
        // KEEPS ADDING POINTS AGAIN AND AGAIN, TRY ADD ACHIEVEMENT ARRAY TO USER
        // OR FIX IT SO IT ONLY SAVES IF USER DOESNT HAVE.
        break;
      case 'pushups':
        break;
      case 'happy':
        console.log('Happy');
        break;
      default:
        console.log('Error');
    }

    // const newExercise = {
    //   name: isCustomExercise ? name : selectedExercise.title,
    //   weight: Number(weight),
    //   sets: Number(sets),
    //   reps: Number(reps),
    //   isCustom: isCustomExercise,
    // };
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
    await checkForAchievements();
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
              <BackTouchable onPress={closeModal}>
                <Icon
                  name={'chevron-down-outline'}
                  size={30}
                  color={'#246EE9'}
                />
              </BackTouchable>
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
                      value={currentExercise?.weight ? `${weight}` : ''}
                      label="KG"
                      onChangeText={input => handleInput('weight', input)}
                    />
                    <SetsRepsView>
                      <ModalInput
                        label="Sets"
                        value={currentExercise?.sets ? `${sets}` : ''}
                        onChangeText={input => handleInput('sets', input)}
                      />
                      <ModalInput
                        value={currentExercise?.reps ? `${reps}` : ''}
                        label="Reps"
                        onChangeText={input => handleInput('reps', input)}
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
