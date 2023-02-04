import React from 'react';
import {Alert} from 'react-native';

export const SignOutAlert = ({onNoAnswer, onYesAnswer, user}) => {
  return Alert.alert(
    `${user.firstName}`,
    'Are you sure you want to sign out?',
    [
      // The "Yes" button
      {
        text: 'No',
        onPress: () => {
          onNoAnswer();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'Yes',
        onPress: () => {
          onYesAnswer();
        },
      },
    ],
  );
};
