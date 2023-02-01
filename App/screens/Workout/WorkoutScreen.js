import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';

export const WorkoutScreen = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#1A1A1A', alignItems: 'center'}}>
      <View>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Workout screen
        </Text>
      </View>
    </SafeAreaView>
  );
};
