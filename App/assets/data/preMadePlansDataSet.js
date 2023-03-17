import {COLORS} from '../appColors/Colors';

export const preMadePlansDataSet = [
  {
    id: 1,
    title: 'Push Pull Legs',
    color: COLORS.blue,
    days: ['Chest + Shoulders + Triceps', 'Back + Biceps', 'Legs', 'Rest'],
    description:
      'This workout split consists of a routine that separates exercise into three categories: pushing movements (e.g. chest press), pulling movements (e.g. rows), and leg exercises. You will alternate between these categories over the course of the week, allowing for balanced training and adequate recovery time',
  },
  {
    id: 2,
    title: 'Bro Split',
    color: COLORS.red,
    days: ['Chest', 'Back', 'Arms', 'Shoulders', 'Legs', 'Rest'],
    description:
      'The infamous bro split. Although this split has a few variations, this is the main one that is used. This plan allows you to hit whichever muscle your working on that day, to the upmost extent. You will hit one muscle group per day and then rest for 2 days once you have hit all the muscles, then repeat.',
  },
  {
    id: 3,
    title: 'Upper Lower',
    color: COLORS.purple,
    days: [
      'Chest + Back + Shoulders + Arms',
      'Quadriceps + Hamstrings + Calves',
      'Rest',
      'Chest + Back + Arms + Shoulders',
      'Quadriceps + Hamstrings + Calves',
      'Rest',
      'Rest',
    ],
    description:
      'This plan splits your workouts between your upper body and lower body, you are able to optimize training frequency and volume distribution allowing you to go 100% for every session. Although you workout for less days than average, the intesity this plan brings is top tier.',
  },
];
