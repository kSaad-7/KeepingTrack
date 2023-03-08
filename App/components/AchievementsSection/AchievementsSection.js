import React from 'react';

import {
  Container,
  Description,
  PictureView,
  TextView,
  Title,
} from './AchievementsSection.styles';

// START BRANCH

export const AchievementsSection = ({achievementsData}) => {
  return achievementsData.map(achievement => {
    const {title, description, docId, pictureUrl} = achievement;
    return (
      <Container key={docId}>
        <PictureView>
          {/* Put image component here wihth the src = pictureUrl (hosted on web) */}
        </PictureView>
        <TextView>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextView>
      </Container>
    );
  });
};
