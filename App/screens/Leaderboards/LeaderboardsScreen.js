import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export const LeaderboardsScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#1A1A1A', alignItems: 'center'}}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
        Leaderboards
      </Text>
      {/*Each leaderboard item will have: 
      - userRef: REFERENCE VALUE (use this to get userName + points)
      */}
    </SafeAreaView>
  );
};
