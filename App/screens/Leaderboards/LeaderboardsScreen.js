import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, Button} from 'react-native';

import {Container, Header, Leaderboards} from './LeaderboardsScreen.styles';
import {db} from '../../firebase.config';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {LeaderboardsSection} from '../../components/LeaderboardsSection/LeaderboardsSection';

export const LeaderboardsScreen = () => {
  const [leaderboardsData, setLeaderboardsData] = useState([{}]);

  const fetchLeaderboard = () => {
    const usersCollection = collection(db, 'users');
    let leaderboards = [{}];
    onSnapshot(query(usersCollection, orderBy('points', 'desc')), docsSnap => {
      leaderboards = docsSnap.docs.map(document => ({
        docId: document.id,
        ...document.data(),
      }));
      setLeaderboardsData(leaderboards);
    });
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <Container>
      <Header>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Leaderboards
        </Text>
      </Header>
      <View style={{flex: 1, padding: 10}}>
        <Leaderboards
          contentContainerStyle={{
            alignItems: 'center',
            flex: 1,
            paddingBottom: 60,
          }}>
          <LeaderboardsSection leaderboardsData={leaderboardsData} />
        </Leaderboards>
      </View>
    </Container>
  );
};
