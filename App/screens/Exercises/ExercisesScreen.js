import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {UserContext, WorkoutContext} from '../../ContextCreator';

import {
  AddNewExerciseView,
  BackTouchable,
  BackTouchableText,
  DeleteText,
  DeleteTouchable,
  EmptyView,
  ExercisesScrollView,
  NewExerciseTouchable,
  ScreenTitle,
  StyledContainer,
  TitleView,
  TopHeaderView,
} from './ExercisesScreen.styles';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {ExercisesSection} from '../../components/ExercisesSection/ExercisesSection';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {ExerciseInputModal} from '../../components/ExerciseInputModal/ExerciseInputModal';
import {COLORS} from '../../assets/appColors/Colors';
import {CustomAlert} from '../../components/CustomAlert/CustomAlert';

export const ExercisesScreen = ({navigation}) => {
  const [exercises, setExercises] = useState();
  const [showInputModal, setShowInputModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCustomExercise, setIsCustomExercise] = useState(false);
  const [showDeleteDayAlert, setShowDeleteDayAlert] = useState(false);

  const {user, setUser} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const handleAddTouchablePress = () => {
    setIsEditMode(false);
    setShowInputModal(true);
  };

  const fetchExercises = async () => {
    const exercisesSubCollRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
      'exercises',
    );
    let exercisesData = [{}];
    onSnapshot(query(exercisesSubCollRef, orderBy('createdAt')), docsSnap => {
      exercisesData = docsSnap.docs.map(document => ({
        docId: document.id,
        ...document.data(),
      }));
      setExercises(exercisesData);
    });
  };

  const deleteWorkoutDay = async () => {
    let currentDayDocRef = doc(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
    );
    const exercisesSubCollectionRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
      'exercises',
    );
    const exercisesQuerySnapshot = await getDocs(exercisesSubCollectionRef);
    if (!exercisesQuerySnapshot.empty) {
      exercisesQuerySnapshot.forEach(async exerciseDoc => {
        const exerciseDocRef = doc(
          db,
          'users',
          user.docId,
          'workoutSplit',
          workoutDayRef.current.docId,
          'exercises',
          exerciseDoc.id,
        );
        await deleteDoc(exerciseDocRef);
      });
    }
    await deleteDoc(currentDayDocRef);
  };

  const handleAlertAnswer = userChoice => {
    if (userChoice === 'no') {
      setShowDeleteDayAlert(false);
    } else {
      setShowDeleteDayAlert(false);
      deleteWorkoutDay();
      setUser({...user, workoutSplitLength: user.workoutSplitLength - 1});
      navigation.navigate('Workout');
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  if (!exercises) {
    return <LoadingIndicator />;
  }

  return (
    <StyledContainer>
      <TopHeaderView>
        <BackTouchable onPress={() => navigation.navigate('Workout')}>
          <IonIcon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
          <BackTouchableText>Workout</BackTouchableText>
        </BackTouchable>
        <DeleteTouchable onPress={() => setShowDeleteDayAlert(true)}>
          <DeleteText>Delete</DeleteText>
        </DeleteTouchable>
        {showDeleteDayAlert && (
          <CustomAlert
            alertTitle={`${workoutDayRef.current.name}`}
            alertText={'Are you sure you want to delete this day?'}
            handleAlertAnswer={handleAlertAnswer}
          />
        )}
      </TopHeaderView>
      <TitleView>
        <ScreenTitle>{workoutDayRef.current.name}</ScreenTitle>
        <TouchableOpacity onPress={() => navigation.navigate('ChangeDayName')}>
          <AntIcon name={'edit'} size={18} color={'#555'} />
        </TouchableOpacity>
      </TitleView>
      <ExercisesScrollView>
        <ExercisesSection
          exercises={exercises}
          setShowInputModal={setShowInputModal}
          setIsEditMode={setIsEditMode}
          setIsCustomExercise={setIsCustomExercise}
        />
        <AddNewExerciseView>
          <NewExerciseTouchable onPress={handleAddTouchablePress}>
            <IonIcon name={'ios-add-circle'} size={40} color={COLORS.blue} />
          </NewExerciseTouchable>
        </AddNewExerciseView>
      </ExercisesScrollView>
      {showInputModal && (
        <ExerciseInputModal
          showInputModal={showInputModal}
          setShowInputModal={setShowInputModal}
          isCustomExercise={isCustomExercise}
          setIsCustomExercise={setIsCustomExercise}
          isEditMode={isEditMode}
        />
      )}
    </StyledContainer>
  );
};
