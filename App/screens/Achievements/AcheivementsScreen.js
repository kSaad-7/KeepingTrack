/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {collection, doc, getDocs, setDoc} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {AchievementsSection} from '../../components/AchievementsSection/AchievementsSection';

import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';

import {UserContext} from '../../ContextCreator';

import {AchievementStatsModal} from '../../components/AchievementStats/AchievementStatsModal';

import {AchievementsFilterTouchable} from '../../components/AchievementsFilterTouchable/AchievementsFilterTouchable';

import {
  Container,
  FilterSection,
  HeaderView,
  ScreenTitle,
  StatsTouchable,
  StyledView,
} from './AcheivementsScreen.styles';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../assets/appColors/Colors';

export const AchievementsScreen = () => {
  const [achievementsData, setAchievementsData] = useState([]);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [filterType, setfilterType] = useState('All');

  const achievementStatsRef = useRef({});
  const {user} = useContext(UserContext);

  const checkUserAchievements = achievementsArray => {
    //Loop through the array of objects using forEach function
    achievementsArray.forEach(achievement => {
      const owners = achievement.owners;
      //Loop through the "owners" array using for loop
      for (let i = 0; i < owners.length; i++) {
        // Check if the ID of the owner is the same as the users
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
      const unlockedAchievementsArray = achievementsData.filter(
        achievement => achievement.doesUserHave === true,
      );
      return unlockedAchievementsArray;
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
    getStats(achievementsAllData);
  };

  const getStats = achievementsArray => {
    const unlockedAchievementsArray = achievementsArray.filter(
      achievement => achievement.doesUserHave === true,
    );
    const lockedAchievementsArray = achievementsArray.filter(
      achievement => achievement.doesUserHave === false,
    );
    let totalUnlocked = unlockedAchievementsArray.length;
    let totalLocked = lockedAchievementsArray.length;
    let progressBarNum = totalUnlocked / totalLocked;
    achievementStatsRef.current = {
      totalUnlocked: totalUnlocked,
      totalLocked: totalLocked,
      progressBarNum: progressBarNum,
      totalPoints: user.points,
      totalSets: user.totalSetsCompleted,
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (achievementsData.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <HeaderView>
        <StyledView>
          <View style={{flex: 0.33}}></View>
          <ScreenTitle>Achievements</ScreenTitle>
          <StatsTouchable onPress={() => setShowStatsModal(true)}>
            <Icon name={'list-circle-sharp'} size={30} color={COLORS.purple} />
          </StatsTouchable>
          {showStatsModal && (
            <AchievementStatsModal
              showStatsModal={showStatsModal}
              setShowStatsModal={setShowStatsModal}
              achievementStatsRef={achievementStatsRef}
            />
          )}
        </StyledView>
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
