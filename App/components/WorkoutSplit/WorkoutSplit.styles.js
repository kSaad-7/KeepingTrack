import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledTouchable = styled.TouchableOpacity`
  flex: 1;
  background-color: ${COLORS.itemGrey};
  // border-color: ${COLORS.blue};
  // border-left-width: 5px;
  box-shadow: 3px 3px ${COLORS.blue};
  margin: 20px 0px;
  padding-left: 10px;
  border-radius: 5px;
  justify-content: center;
`;

export const DayName = styled.Text`
  color: ${COLORS.offWhite}
  font-weight: bold;
  font-size: 17px;
`;
