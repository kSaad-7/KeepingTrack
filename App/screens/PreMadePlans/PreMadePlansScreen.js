import React from 'react';

import {
  BackTouchable,
  BackTouchableText,
  Container,
  Header,
  PlansView,
  ScreenTitle,
} from './PreMadePlansScreen.styles';

import Icon from 'react-native-vector-icons/Ionicons';

import {PreMadePlanItem} from '../../components/PreMadePlanItem/PreMadePlanItem';
import {View} from 'react-native';

export const PreMadePlansScreen = ({navigation}) => {
  return (
    <Container>
      <Header>
        <BackTouchable onPress={() => navigation.navigate('Workout')}>
          <Icon name={'chevron-back-outline'} size={15} color={'#246EE9'} />
          <BackTouchableText>Workout</BackTouchableText>
        </BackTouchable>
        <ScreenTitle>Select workout plan</ScreenTitle>
        <View style={{flex: 0.33}} />
      </Header>

      <PlansView horizontal={true} showsHorizontalScrollIndicator={false}>
        <PreMadePlanItem />
      </PlansView>
    </Container>
  );
};
