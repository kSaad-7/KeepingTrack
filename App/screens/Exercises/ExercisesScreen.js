import React, {useContext, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {UserContext, WorkoutContext} from '../../ContextCreator';

import {
  BackTouchable,
  BackTouchableText,
  EmptyView,
  ScreenTitle,
  StyledContainer,
  TitleView,
  TopHeaderView,
} from './ExercisesScreen.styles';

import {collection, getDocs} from 'firebase/firestore';
import {Text, View} from 'react-native';
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
      <View style={{flex: 0.95, width: '90%'}}>
        <ExercisesSection exercises={exercises} />
        <Text style={{color: 'white'}}>hello</Text>
      </View>
    </StyledContainer>
  );
};
