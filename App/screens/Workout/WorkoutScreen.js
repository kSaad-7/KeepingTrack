import React, {useContext} from 'react';
import {Text, SafeAreaView, View} from 'react-native';

import {UserContext} from '../../ContextCreator';

export const WorkoutScreen = () => {
  const {user} = useContext(UserContext);
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#1A1A1A', alignItems: 'center'}}>
      <View>
        {/* -------------------------------- */}
        {/*/ MAYBE CHANGE TO "Welcome back, [user.firstName] or something" */}
        {/* -------------------------------- */}
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
          Workout screen
        </Text>
      </View>
    </SafeAreaView>
  );
};
