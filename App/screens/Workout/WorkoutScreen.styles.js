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

export const WorkoutSplitView = styled.ScrollView`
  // background-color: red;
  flex: 0.95;
  width: 90%;
`;

export const PreMadePlansView = styled.TouchableOpacity`
  flex: 0.05;
  margin-bottom: 15px;
  margin-top: 10px;
  width: 70%;
  background-color: ${COLORS.blue};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
`;
