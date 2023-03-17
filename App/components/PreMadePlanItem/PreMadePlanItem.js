/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {preMadePlansDataSet} from '../../assets/data/preMadePlansDataSet';

import {
  DayLabel,
  DaysView,
  DescrioptionTitle,
  Description,
  DescriptionText,
  Header,
  Muscles,
  PlanName,
  TouchableContainer,
} from './PreMadePlanItem.styles';

import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../assets/appColors/Colors';

const DaysSection = ({preMadePlan}) => {
  const planDaysArray = preMadePlan.days;
  return planDaysArray.map((muscles, index) => {
    index += 1;
    return (
      <DayLabel key={index}>
        Day {index}{' '}
        <Icon
          name={'caret-forward-outline'}
          size={15}
          color={`${preMadePlan.color}`}
        />{' '}
        <Muscles>{muscles}</Muscles>
      </DayLabel>
    );
  });
};

export const PreMadePlanItem = ({onPreMadePlanPress}) => {
  return preMadePlansDataSet.map(preMadePlan => {
    const {title, color, description, id} = preMadePlan;
    return (
      <TouchableContainer
        key={id}
        onPress={() => onPreMadePlanPress(preMadePlan)}>
        <LinearGradient
          colors={[COLORS.itemGrey, `${color}`]}
          style={{
            height: '100%',
            borderRadius: 8,
          }}
          locations={[0.5, 0.5]}
          start={{x: 0.25, y: 0.15}}
          end={{x: 0, y: 0}}>
          <Header>
            <PlanName style={{color: `${color}`}}>{title}</PlanName>
          </Header>
          <DaysView>
            <DaysSection preMadePlan={preMadePlan} />
          </DaysView>
          <Description>
            <DescrioptionTitle>Description</DescrioptionTitle>
            <DescriptionText>{description}</DescriptionText>
          </Description>
        </LinearGradient>
      </TouchableContainer>
    );
  });
};
