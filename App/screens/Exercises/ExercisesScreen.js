import React, {useContext, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {UserContext, WorkoutContext} from '../../ContextCreator';

import {
  BackTouchable,
  BackTouchableText,
  EmptyView,
  ExercisesScrollView,
  ScreenTitle,
  StyledContainer,
  TitleView,
  TopHeaderView,
} from './ExercisesScreen.styles';

import {addDoc, collection, getDocs} from 'firebase/firestore';
import {Button, ScrollView, Text, View} from 'react-native';
import {db} from '../../firebase.config';

import {ExercisesSection} from '../../components/ExercisesSection/ExercisesSection';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';

export const ExercisesScreen = ({navigation}) => {
  const [exercises, setExercises] = useState();

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

  const addNewExercise = async () => {
    const exercisesSubCollRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
      workoutDayRef.current.docId,
      'exercises',
    );

    const x = await addDoc(exercisesSubCollRef, {
      name: 'Pitfall',
      weight: 20,
      sets: 3,
      reps: 20,
    });
    console.log('New doc: ', x.id);
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
        <ExercisesSection exercises={exercises} />
        <Button title="Add new exerise" onPress={addNewExercise} />
      </ExercisesScrollView>
    </StyledContainer>
  );
};
