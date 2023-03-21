/* eslint-disable no-alert */
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';

import {
  BackTouchable,
  BackTouchableText,
  Container,
  Header,
  PlansView,
  ScreenTitle,
} from './PreMadePlansScreen.styles';

import Icon from 'react-native-vector-icons/Ionicons';

import {PreMadePlansSection} from '../../components/PreMadePlansSection/PreMadePlansSection';

import {UserContext, WorkoutContext} from '../../ContextCreator';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import {db} from '../../firebase.config';

export const PreMadePlansScreen = ({navigation}) => {
  const {currentPreMadePlan, setCurrentPreMadePlan} =
    useContext(WorkoutContext);
  const {user} = useContext(UserContext);

  const workoutSplitSubCollectionRef = collection(
    db,
    'users',
    user.docId,
    'workoutSplit',
  );

  const deleteExercisesInDoc = async docID => {
    const exercisesSubCollectionRef = collection(
      db,
      'users',
      user.docId,
      'workoutSplit',
      docID,
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
          docID,
          'exercises',
          exerciseDoc.id,
        );
        await deleteDoc(exerciseDocRef);
      });
    }
  };

  const deleteCurrentWorkoutSplit = async () => {
    //Get all docs, forEach loop through documents and delete them.
    const workoutQuerySnapshot = await getDocs(workoutSplitSubCollectionRef);
    workoutQuerySnapshot.forEach(async document => {
      deleteExercisesInDoc(document.id);
      const workoutDocRef = doc(
        db,
        'users',
        user.docId,
        'workoutSplit',
        document.id,
      );
      await deleteDoc(workoutDocRef);
    });
    return true;
  };

  const addExercises = exercisesArray => {
    // Go through each "exercises" object and make a new document
    exercisesArray.forEach(async exercise => {
      console.log('exercise: ', exercise);
      const exerciseSubCollRef = collection(
        db,
        'users',
        user.docId,
        'workoutSplit',
        exercise.workoutDayId,
        'exercises',
      );
      const ref = await addDoc(exerciseSubCollRef, {
        name: exercise.name,
        weight: exercise.weight,
        sets: exercise.sets,
        reps: exercise.reps,
        isCustom: exercise.isCustom,
        createdAt: Timestamp.fromDate(new Date()),
      });
    });
  };

  const addNewWorkoutSplit = async preMadePlan => {
    const planDaysArray = preMadePlan.days;
    await deleteCurrentWorkoutSplit(planDaysArray);
    // Go through each day and make a new document in the sub-collection
    planDaysArray.forEach(async (day, i) => {
      await setDoc(doc(workoutSplitSubCollectionRef, `day${i + 1}`), {
        name: `${day}`,
        docId: `day${i + 1}`,
      });
    });
    await new Promise(r => setTimeout(r, 1500));
    addExercises(preMadePlan.exercises);
  };
  const handlePress = async preMadePlan => {
    setCurrentPreMadePlan(preMadePlan);
    await addNewWorkoutSplit(preMadePlan);
  };

  return (
    <Container>
      <Header>
        <BackTouchable onPress={() => navigation.navigate('Workout')}>
          <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
          <BackTouchableText>Workout</BackTouchableText>
        </BackTouchable>
        <ScreenTitle>Select workout plan</ScreenTitle>
        <View style={{flex: 0.33}} />
      </Header>
      <PlansView horizontal={true} showsHorizontalScrollIndicator={false}>
        <PreMadePlansSection
          onPreMadePlanPress={handlePress}
          currentPreMadePlan={currentPreMadePlan}
        />
      </PlansView>
    </Container>
  );
};
