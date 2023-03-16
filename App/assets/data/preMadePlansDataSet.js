import {COLORS} from '../appColors/Colors';

export const preMadePlansDataSet = [
  {
    title: 'Push Pull Legs',
    color: COLORS.blue,
    days: {
      day1: 'Chest + Shoulders + Triceps',
      day2: 'Back + Biceps',
      day3: 'Legs',
      day4: 'Chest + Shoulders + Triceps',
      day5: 'Back + Biceps',
      day6: 'Legs',
      day7: 'Rest',
    },
    description:
      'This workout split consists of a routine that separates exercise into three categories: pushing movements (e.g. chest press), pulling movements (e.g. rows), and leg exercises. You will alternate between these categories over the course of the week, allowing for balanced training and adequate recovery time',
  },
  {
    title: 'Bro Split',
    color: COLORS.red,
    days: {
      day1: 'Chest',
      day2: 'Back',
      day3: 'Arms',
      day4: 'Shoulders',
      day5: 'Legs',
      day6: 'Rest',
      day7: 'Rest',
    },
    description:
      'The infamous bro split. Although this split has a few variations, this is the main one that is used. This plan allows you to hit whichever muscle your working on that day, to the upmost extent. You will hit one muscle group per day and then rest for 2 days once you have hit all the muscles, then repeat.',
  },
  {
    title: 'Upper Lower',
    color: COLORS.purple,
    days: {
      day1: 'Chest + Back + Shoulders + Arms',
      day2: 'Quadriceps + Hamstrings + Calves',
      day3: 'Rest',
      day4: 'Chest + Back + Arms + Shoulders',
      day5: 'Quadriceps + Hamstrings + Calves',
      day6: 'Rest',
      day7: 'Rest',
    },
    description:
      'This plan splits your workouts between your upper body and lower body, you are able to optimize training frequency and volume distribution allowing you to go 100% for every session. Although you workout for less days than average, the intesity this plan brings is top tier.',
  },
];
