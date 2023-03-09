import React, {useContext, useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';

import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../firebase.config';

import {AchievementsSection} from '../../components/Achievements/AchievementsSection';

import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';

import {COLORS} from '../../assets/appColors/Colors';

import {UserContext} from '../../ContextCreator';

export const AchievementsScreen = () => {
  const [achievementsData, setAchievementsData] = useState();

  const {user} = useContext(UserContext);

  // check if owner.id === user.docId
  const checkUserAchievements = achievementsArray => {
    achievementsArray.forEach(achievement => {
      const owners = achievement.owners;
      owners.forEach(owner => {
        if (owner.id === user.docId) {
          achievement.doesUserHave = true;
        } else {
          achievement.doesUserHave = false;
        }
      });
    });
    return achievementsArray;
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundBlack}}>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Achievements
        </Text>
        <View style={{flex: 0.5, backgroundColor: 'red'}}>
          <Text>
            ...........................................FILTERS............................................
          </Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <AchievementsSection achievementsData={achievementsData} />
      </ScrollView>
    </SafeAreaView>
  );
};
