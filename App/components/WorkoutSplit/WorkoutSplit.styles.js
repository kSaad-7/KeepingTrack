import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledTouchable = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  width: 340px;
  background-color: ${COLORS.itemGrey};
  box-shadow: 4px 4px ${COLORS.blue};
  margin: 20px 0px;
  padding-left: 10px;
  border-radius: 5px;
  justify-content: center;
`;

export const StyledView = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const DayName = styled.Text`
  color: ${COLORS.offWhite}
  font-weight: bold;
  font-size: 18px;
`;
