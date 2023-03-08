import React from 'react';

import {
  Container,
  Description,
  Logo,
  PictureView,
  TextView,
  Title,
} from './AchievementsSection.styles';

import AchievementBadge2 from '../../assets/images/AchievementBadge2.png';

export const AchievementsSection = ({achievementsData}) => {
  return achievementsData.map(achievement => {
    const {title, description, docId, pictureUrl} = achievement;
    return (
      <Container key={docId}>
        <PictureView>
          <Logo source={AchievementBadge2} />
        </PictureView>
        <TextView>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextView>
      </Container>
    );
  });
};
