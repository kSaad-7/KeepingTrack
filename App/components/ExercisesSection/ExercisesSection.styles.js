import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledTouchable = styled.TouchableOpacity`
  height: 80px;
  background-color: ${COLORS.itemGrey};
  margin: 20px 0px;
  border-radius: 7px;
`;

export const ExerciseNameView = styled.View`
  // background-color: green;
  margin-bottom: 10px;
  padding-top: 10px;
  margin-left: 10px;
`;

export const ExerciseName = styled.Text`
  // color: ${COLORS.offWhite};
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export const BlueInfoText = styled.Text`
  color: ${COLORS.blue};
  font-weight: bold;
  font-size: 18px;
`;

export const InfoView = styled.View`
  flex-direction: row;
  justify-content: space-evenly
  margin: 10px 20px;
`;

export const StyledText = styled.Text`
  font-size: 14px;
  color: ${COLORS.offWhite};
  font-weight: 600;
`;
