import React from 'react';
import {Alert} from 'react-native';

export const CustomAlert = ({
  onNoAnswer,
  onYesAnswer,
  alertTitle,
  alertText,
}) => {
  return Alert.alert(`${alertTitle}`, `${alertText}`, [
    // The "No" button
    {
      text: 'No',
      onPress: () => {
        onNoAnswer();
      },
    },
    // The "Yes" button
    {
      text: 'Yes',
      onPress: () => {
        onYesAnswer();
      },
    },
  ]);
};
