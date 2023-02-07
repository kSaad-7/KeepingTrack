import React from 'react';
import {Alert} from 'react-native';

export const CustomAlert = ({alertTitle, handleAlertAnswer, alertText}) => {
  return Alert.alert(`${alertTitle}`, `${alertText}`, [
    // The "No" button
    {
      text: 'No',
      onPress: () => {
        handleAlertAnswer('no');
      },
    },
    // The "Yes" button
    {
      text: 'Yes',
      onPress: () => {
        handleAlertAnswer('yes');
      },
    },
  ]);
};
