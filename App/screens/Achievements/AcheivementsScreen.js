import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';

import {collection, getDocs, onSnapshot} from 'firebase/firestore';

import {AchievementsSection} from '../../components/AchievementsSection/AchievementsSection';
import {db} from '../../firebase.config';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {COLORS} from '../../assets/appColors/Colors';

export const AchievementsScreen = () => {
  const [achievementsData, setAchievementsData] = useState();

  const fetchData = async () => {
    const achievementsCollectionRef = collection(db, 'achievements');
    let achievementsAllData = [{}];
    onSnapshot(achievementsCollectionRef, docsSnap => {
      achievementsAllData = docsSnap.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setAchievementsData(achievementsAllData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!achievementsData) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundBlack}}>
      <View style={{flex: 0.05, alignItems: 'center'}}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Achievements
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <AchievementsSection achievementsData={achievementsData} />
      </ScrollView>
    </SafeAreaView>
  );
};
