import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {db} from '../../firebase.config';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';

import {UserContext} from '../../ContextCreator';
import {WorkoutContext} from '../../ContextCreator';

import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {WorkoutSplit} from '../../components/WorkoutSplit/WorkoutSplit';
import {
  PreMadePlansView,
  ScreenHeadingText,
  StyledContainer,
  StyledText,
  WorkoutSplitView,
} from './WorkoutScreen.styles';

export const WorkoutScreen = ({navigation}) => {
  const [data, setData] = useState(null);

  //Getting context
  const {user} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const fetchData = async () => {
    const workoutSplitRef = collection(db, 'users', user.docId, 'workoutSplit');
    let workoutSplitData = [{}];
    onSnapshot(workoutSplitRef, docsSnap => {
      workoutSplitData = docsSnap.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setData(workoutSplitData);
    });
  };

  const handleDayClick = selectedDay => {
    workoutDayRef.current = selectedDay;
    navigation.navigate('Exercises');
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <LoadingIndicator />;
  }

  return (
    <StyledContainer>
      <View style={{flex: 0.03}}>
        <ScreenHeadingText>Workout</ScreenHeadingText>
        <ScreenHeadingText style={{color: 'red'}}>
          ALLOW USER TO ADD A NEW DAY!!
        </ScreenHeadingText>
        {/* WHEN ADDING NEW DAY, MODAL LIKE THE EXERCISE MODAL (SLIDE FROM BOTTOM) */}
      </View>
      <WorkoutSplitView>
        <WorkoutSplit data={data} onDayClick={handleDayClick} />
      </WorkoutSplitView>
      <PreMadePlansView onPress={() => navigation.navigate('PreMadePlans')}>
        <StyledText>Pre-made workout plans</StyledText>
      </PreMadePlansView>
    </StyledContainer>
  );
};
