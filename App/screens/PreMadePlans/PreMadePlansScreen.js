/* eslint-disable no-alert */
import React, {useContext} from 'react';
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

import {PreMadePlanItem} from '../../components/PreMadePlanItem/PreMadePlanItem';

import {UserContext} from '../../ContextCreator';

import {collection, deleteDoc, doc, getDocs, setDoc} from 'firebase/firestore';
import {db} from '../../firebase.config';

export const PreMadePlansScreen = ({navigation}) => {
  const {user} = useContext(UserContext);

  const workoutSplitSubCollectionRef = collection(
    db,
    'users',
    user.docId,
    'workoutSplit',
  );

  const addNewWorkoutSplit = async planDaysArray => {
    //Get all docs, forEach loop through documents and delete them.
    const querySnapshot = await getDocs(workoutSplitSubCollectionRef);
    querySnapshot.forEach(async document => {
      const docRef = doc(db, 'users', user.docId, 'workoutSplit', document.id);
      await deleteDoc(docRef);
    });
    //Go through each day and make a new document in the sub-collection
    planDaysArray.map(async (day, i) => {
      await setDoc(doc(workoutSplitSubCollectionRef, `day${i + 1}`), {
        name: `${day}`,
        docId: `day${i + 1}`,
      });
    });
  };

  const handlePushPullLegsPlan = preMadePlan => {
    addNewWorkoutSplit(preMadePlan.days);
    /// addExercises(preMadePlan) => function that adds the exercises to each day
  };

  const handleBroSplitPlan = preMadePlan => {
    addNewWorkoutSplit(preMadePlan.days);
  };

  const handleUpperLowerPlan = preMadePlan => {
    addNewWorkoutSplit(preMadePlan.days);
  };

  const handlePress = preMadePlan => {
    const planID = preMadePlan.id;
    switch (planID) {
      case 1:
        handlePushPullLegsPlan(preMadePlan);
        break;
      case 2:
        handleBroSplitPlan(preMadePlan);
        break;
      case 3:
        handleUpperLowerPlan(preMadePlan);
        break;
      default:
        alert('Error');
    }
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
        <PreMadePlanItem onPreMadePlanPress={handlePress} />
      </PlansView>
    </Container>
  );
};
