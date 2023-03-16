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

export const PreMadePlanItem = () => {
  return preMadePlansDataSet.map(preMadePlan => {
    const {title, color, days, description} = preMadePlan;

    return (
      <TouchableContainer key={title}>
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
            <DayLabel>
              Day 1{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day1}</Muscles>
            </DayLabel>
            <DayLabel>
              Day 2{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day2}</Muscles>
            </DayLabel>
            <DayLabel>
              Day 3{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day3}</Muscles>
            </DayLabel>
            <DayLabel>
              Day 4{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day4}</Muscles>
            </DayLabel>
            <DayLabel>
              Day 5{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day5}</Muscles>
            </DayLabel>
            <DayLabel>
              Day 6{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day6}</Muscles>
            </DayLabel>
            <DayLabel>
              Day 7{' '}
              <Icon
                name={'caret-forward-outline'}
                size={15}
                color={`${color}`}
              />{' '}
              <Muscles>{days.day7}</Muscles>
            </DayLabel>
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
