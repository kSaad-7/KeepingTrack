import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const Header = styled.View`
  flex: 0.1;
  align-items: center;
`;

export const Leaderboards = styled.ScrollView`
  flex: 0.9;
  margin: 0% 3%;
  // background-color: ${COLORS.blue};
`;
