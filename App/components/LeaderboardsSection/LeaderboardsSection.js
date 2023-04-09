import React, {useContext} from 'react';
import styled from 'styled-components';

import {COLORS} from '../../assets/appColors/Colors';
import {UserContext} from '../../ContextCreator';

import {Points, StyledView, UserName} from './LeaderboardsSection.styles';

export const LeaderboardsSection = ({leaderboardsData}) => {
  const {user} = useContext(UserContext);
  return leaderboardsData.map(userInLeaderboards => {
    const {userName, points} = userInLeaderboards;
    let isUser = false;
    if (user.userName === userName) {
      isUser = true;
    }
    return (
      <StyledView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          borderWidth: isUser ? 1 : 0,
          borderColor: isUser ? COLORS.blue : 'transparent',
        }}>
        <UserName>{userName}</UserName>
        <Points>{points}</Points>
      </StyledView>
    );
  });
};
