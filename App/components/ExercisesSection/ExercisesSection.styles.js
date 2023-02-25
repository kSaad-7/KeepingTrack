import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledTouchable = styled.TouchableOpacity`
  height: 70px;
  background-color: ${COLORS.itemGrey};
  margin: 15px 0px;
  border-radius: 8px;
`;

export const ExerciseNameView = styled.View`
  margin-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
`;

export const ExerciseName = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

export const BoldInfoText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const InfoView = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 0px 20px;
`;

export const StyledText = styled.Text`
  font-size: 13px;
  color: ${COLORS.offWhite};
  font-weight: bold;
`;
