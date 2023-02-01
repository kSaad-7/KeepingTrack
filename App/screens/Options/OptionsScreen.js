import React from 'react';
import {Text, View, Button, SafeAreaView} from 'react-native';

// TODO: Use figma to make the buttons, have one custom component + use props to display text
// TODO: Make sure 'Sign out' button has different styles.

export const OptionsScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#1A1A1A', alignItems: 'center'}}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
        Settings
      </Text>
      <Button
        title="Hello"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};
