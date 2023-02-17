import React, {useContext, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
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

import {addDoc, collection, getDocs} from 'firebase/firestore';
import {TouchableOpacity, View} from 'react-native';
import {db} from '../../firebase.config';

import {ExercisesSection} from '../../components/ExercisesSection/ExercisesSection';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {ExerciseInputModal} from '../../components/ExerciseInputModal/ExerciseInputModal';
import {COLORS} from '../../assets/appColors/Colors';

export const ExercisesScreen = ({navigation}) => {
  const [exercises, setExercises] = useState();
  const [showInputModal, setShowInputModal] = useState(false);
  const [exerciseValues, setExerciseValues] = useState({
    name: '',
    weight: '',
    sets: '',
    reps: '',
  });

  const {user} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const fetchExercises = async () => {
    const exercisesSubCollRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
      'exercises',
    );
    const allDocuments = await getDocs(exercisesSubCollRef);
    const exercisesData = allDocuments.docs.map(doc => ({
      docId: doc.id,
      ...doc.data(),
    }));
    setExercises(exercisesData);
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
          <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
          <BackTouchableText>Workout</BackTouchableText>
        </BackTouchable>
        <TitleView>
          <ScreenTitle>{workoutDayRef.current.name}</ScreenTitle>
        </TitleView>
        <EmptyView />
      </TopHeaderView>
      <ExercisesScrollView>
        <ExercisesSection
          exercises={exercises}
          setShowInputModal={setShowInputModal}
          setExerciseValues={setExerciseValues}
        />
        <AddNewExerciseView>
          <NewExerciseTouchable onPress={() => setShowInputModal(true)}>
            <Icon name={'add-outline'} size={30} color={COLORS.offWhite} />
          </NewExerciseTouchable>
        </AddNewExerciseView>
      </ExercisesScrollView>
      {showInputModal && (
        <ExerciseInputModal
          showInputModal={showInputModal}
          setShowInputModal={setShowInputModal}
          exerciseValues={exerciseValues}
          setExerciseValues={setExerciseValues}
        />
      )}
    </StyledContainer>
  );
};
