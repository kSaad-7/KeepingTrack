import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';

import {db} from '../../firebase.config';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';

import MaterialIcon from 'react-native-vector-icons/Entypo';

import {UserContext} from '../../ContextCreator';
import {WorkoutContext} from '../../ContextCreator';

import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {WorkoutSplit} from '../../components/WorkoutSplit/WorkoutSplit';
import {
  HeaderView,
  NewDayTouchable,
  PreMadePlansTouchable,
  ScreenHeadingText,
  StyledContainer,
  StyledText,
  StyledView,
  WorkoutSplitView,
} from './WorkoutScreen.styles';
import {COLORS} from '../../assets/appColors/Colors';

import {NewWorkoutDayModal} from '../../components/NewWorkoutDayModal/NewWorkoutDayModal';

export const WorkoutScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [showNewDayModal, setShowNewDayModal] = useState(false);

  //Getting context
  const {user, setUser} = useContext(UserContext);
  const {workoutDayRef} = useContext(WorkoutContext);

  const fetchData = async () => {
    const workoutSplitRef = collection(db, 'users', user.docId, 'workoutSplit');
    let workoutSplitData = [{}];
    onSnapshot(query(workoutSplitRef, orderBy('createdAt')), docsSnap => {
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

  const onAddNewDayPress = () => {
    setShowNewDayModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <LoadingIndicator />;
  }

  return (
    <StyledContainer>
      <HeaderView>
        <StyledView>
          <View style={{flex: 0.33}} />
          <ScreenHeadingText>Workout</ScreenHeadingText>
          <NewDayTouchable onPress={onAddNewDayPress}>
            <MaterialIcon
              style={{right: 10}}
              name={'add-to-list'}
              size={28}
              color={COLORS.blue}
            />
          </NewDayTouchable>
          {showNewDayModal && (
            <NewWorkoutDayModal
              setShowNewDayModal={setShowNewDayModal}
              showNewDayModal={showNewDayModal}
              user={user}
              setUser={setUser}
            />
          )}
        </StyledView>
      </HeaderView>
      <WorkoutSplitView>
        <WorkoutSplit data={data} onDayClick={handleDayClick} />
      </WorkoutSplitView>
      <PreMadePlansTouchable
        onPress={() => navigation.navigate('PreMadePlans')}>
        <StyledText>Pre-made workout plans</StyledText>
      </PreMadePlansTouchable>
    </StyledContainer>
  );
};
