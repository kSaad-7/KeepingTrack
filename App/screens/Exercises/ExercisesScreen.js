import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {UserContext, WorkoutContext} from '../../ContextCreator';

import {
  AddNewExerciseView,
  BackTouchable,
  BackTouchableText,
  EmptyView,
  ExercisesScrollView,
  NewExerciseTouchable,
  ScreenTitle,
  StyledContainer,
  TitleView,
  TopHeaderView,
} from './ExercisesScreen.styles';

import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {ExercisesSection} from '../../components/ExercisesSection/ExercisesSection';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {ExerciseInputModal} from '../../components/ExerciseInputModal/ExerciseInputModal';
import {COLORS} from '../../assets/appColors/Colors';

export const ExercisesScreen = ({navigation}) => {
  const [exercises, setExercises] = useState();
  const [showInputModal, setShowInputModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCustomExercise, setIsCustomExercise] = useState(false);
  const [exerciseValues, setExerciseValues] = useState({
    name: '',
    weight: '',
    sets: '',
    reps: '',
    docId: '',
  });

  const {user} = useContext(UserContext);
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
      exercisesData = docsSnap.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setExercises(exercisesData);
    });
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
        <EmptyView />
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
          setExerciseValues={setExerciseValues}
          setIsEditMode={setIsEditMode}
          setIsCustomExercise={setIsCustomExercise}
        />
        <AddNewExerciseView>
          <NewExerciseTouchable onPress={handleAddTouchablePress}>
            <IonIcon name={'add-outline'} size={30} color={COLORS.offWhite} />
          </NewExerciseTouchable>
        </AddNewExerciseView>
      </ExercisesScrollView>
      {showInputModal && (
        <ExerciseInputModal
          showInputModal={showInputModal}
          setShowInputModal={setShowInputModal}
          isCustomExercise={isCustomExercise}
          setIsCustomExercise={setIsCustomExercise}
          exerciseValues={exerciseValues}
          setExerciseValues={setExerciseValues}
          isEditMode={isEditMode}
        />
      )}
    </StyledContainer>
  );
};
