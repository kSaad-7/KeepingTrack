/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {COLORS} from '../../assets/appColors/Colors';

import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {Container} from './AutoCompleteInput.styles';

export const AutoCompleteInput = ({initalValue, onSelectItem, dataSet}) => {
  return (
    <Container>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        initialValue={initalValue}
        onSelectItem={onSelectItem}
        dataSet={dataSet}
        suggestionsListTextStyle={{
          fontSize: 15,
          fontWeight: 'bold',
          color: COLORS.offWhite,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: `${COLORS.backgroundBlack}`,
        }}
        textInputProps={{
          style: {
            backgroundColor: COLORS.backgroundBlack,
            color: COLORS.offWhite,
            borderRadius: 10,
          },
        }}
        inputContainerStyle={{
          backgroundColor: `${COLORS.backgroundBlack}`,
          borderRadius: 10,
          color: COLORS.offWhite,
        }}
        rightButtonsContainerStyle={{
          right: 7,
          backgroundColor: `${COLORS.backgroundBlack}`,
        }}
      />
    </Container>
  );
};
