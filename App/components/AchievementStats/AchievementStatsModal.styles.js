import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  flex: 0.5;
  margin: 20px;
  border-radius: 30px;
  background-color: ${COLORS.itemGrey};
  align-items: center;
`;

export const ProgressBarView = styled.View`
  flex: 0.2;
  margin-top: 10px;
  align-items: center;
  justify-content: space-around;
`;

export const StyledText = styled.Text`
  color: ${COLORS.offWhite};
  font-weight: bold;
  font-size: 20px;
`;

export const StatsView = styled.View`
  flex: 0.8;
  margin-top: 25px;
  // background-color: green;
`;

export const StatLabel = styled.Text`
  margin: 20px;
  color: ${COLORS.offWhite};
  font-size: 15px;
  font-weight: 700;
`;

export const Stat = styled.Text`
  font-weight: 400;
`;
