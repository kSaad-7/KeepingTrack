import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {db} from '../../firebase.config';
import {collection, getDocs} from 'firebase/firestore';

import {UserContext} from '../../ContextCreator';
import {WorkoutContext} from '../../ContextCreator';

import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {WorkoutSplit} from '../../components/WorkoutSplit/WorkoutSplit';
import {
  ScreenHeadingText,
  StyledContainer,
  WorkoutSplitView,
} from './WorkoutScreen.styles';

export const WorkoutScreen = ({navigation}) => {
  const [data, setData] = useState(null);

  //Getting context
  const {user} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const fetchData = async () => {
    try {
      const workoutSplitRef = collection(
        db,
        'users',
        user.docId,
        'workoutSplit',
      );
      const allDocuments = await getDocs(workoutSplitRef);
      const workoutSplitData = allDocuments.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setData(workoutSplitData);
    } catch (err) {
      console.log(err);
    }
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
      <View>
        <ScreenHeadingText>Workout</ScreenHeadingText>
      </View>
      <WorkoutSplitView>
        <WorkoutSplit data={data} onDayClick={handleDayClick} />
      </WorkoutSplitView>
      <View>
        <Text style={{color: 'white'}}>
          *[PRE MADE PLANS] horizontal scrollview*
        </Text>
      </View>
    </StyledContainer>
  );
};
