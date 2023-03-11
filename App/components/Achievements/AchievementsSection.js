/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  Container,
  Description,
  Logo,
  PictureView,
  Points,
  PointsView,
  TextView,
  Title,
} from './AchievementsSection.styles';

import AchievementBadge5 from '../../assets/images/AchievementBadge5.png';

export const AchievementsSection = ({achievementsData}) => {
  return achievementsData.map(achievement => {
    const {title, description, docId, points, doesUserHave} = achievement;
    return (
      <Container key={docId}>
        <PictureView>
          <Logo source={AchievementBadge5} />
        </PictureView>
        <TextView>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextView>
        <PointsView>
          <Points style={{color: doesUserHave ? '#49fc03' : '#f00c'}}>
            {points}
          </Points>
        </PointsView>
      </Container>
    );
  });
};
