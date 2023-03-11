import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {AchievementsSection} from '../../components/Achievements/AchievementsSection';

import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';

import {UserContext} from '../../ContextCreator';
import {AchievementsFilterTouchable} from '../../components/AchievementsFilterTouchable/AchievementsFilterTouchable';
import {
  Container,
  FilterSection,
  HeaderView,
  ScreenTitle,
} from './AcheivementsScreen.styles';

export const AchievementsScreen = () => {
  const [achievementsData, setAchievementsData] = useState();
  const [filterType, setfilterType] = useState('All');

  const {user} = useContext(UserContext);

  const checkUserAchievements = achievementsArray => {
    //Loop through the array of objects using forEach function
    achievementsArray.forEach(achievement => {
      const owners = achievement.owners;
      //Loop through the "owners" array using for loop
      for (let i = 0; i < owners.length; i++) {
        if (owners[i].id === user.docId) {
          achievement.doesUserHave = true;
          return;
        }
      }
    });
    return achievementsArray;
  };

  const filterAchievements = () => {
    if (filterType === 'All') {
      return achievementsData;
    } else if (filterType === 'Unlocked') {
      return achievementsData.filter(
        achievement => achievement.doesUserHave === true,
      );
    } else if (filterType === 'Locked') {
      return achievementsData.filter(
        achievement => achievement.doesUserHave === false,
      );
    }
  };

  const fetchData = async () => {
    const achievementsCollectionRef = collection(db, 'achievements');
    const querySnapshot = await getDocs(achievementsCollectionRef);
    const achievementsAllData = querySnapshot.docs.map(document => ({
      docId: document.id,
      doesUserHave: false,
      ...document.data(),
    }));
    checkUserAchievements(achievementsAllData);
    setAchievementsData(achievementsAllData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!achievementsData) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <HeaderView>
        <ScreenTitle>Achievements</ScreenTitle>
        <FilterSection>
          <AchievementsFilterTouchable
            label="All"
            onPress={() => setfilterType('All')}
            filterType={filterType}
          />
          <AchievementsFilterTouchable
            label="Unlocked"
            onPress={() => setfilterType('Unlocked')}
            filterType={filterType}
          />
          <AchievementsFilterTouchable
            label="Locked"
            onPress={() => setfilterType('Locked')}
            filterType={filterType}
          />
        </FilterSection>
      </HeaderView>
      <ScrollView style={{flex: 1}}>
        <AchievementsSection achievementsData={filterAchievements()} />
      </ScrollView>
    </Container>
  );
};
