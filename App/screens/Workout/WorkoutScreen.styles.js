import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
  align-items: center;
`;

export const ScreenHeadingText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const WorkoutSplitView = styled.View`
  flex: 0.95;
  width: 90%;
`;
