import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const TouchableContainer = styled.TouchableOpacity`
  width: 350px;
  height: 100%;
  margin: 0px 10px;
  background-color: ${COLORS.itemGrey};
  border-radius: 8px;
`;

export const Header = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
`;

export const PlanName = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 22px;
  font-weight: bold;
`;

export const DaysView = styled.View`
  flex: 0.55;
  margin-top: 20px;
  padding-left: 10px;
  justify-content: space-between;
`;

export const DayLabel = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 15px;
  margin: 15px 10px;
  font-weight: 600;
`;

export const Muscles = styled.Text`
  font-weight: 400;
`;

export const Description = styled.View`
  flex: 0.35;
`;

export const DescrioptionTitle = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 18px;
  margin-top: 30px;
  margin-left: 20px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const DescriptionText = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 15px;
  margin-left: 20px;
  margin-right: 10px;
`;
