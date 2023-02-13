import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledTouchable = styled.TouchableOpacity`
  flex: 1;
  background-color: ${COLORS.greyBlack}
  margin: 20px 0px;
  justify-content: center;
  padding-left: 10px;
  border-radius: 7px;
`;

export const DayName = styled.Text`
  color: ${COLORS.offWhite}
  font-weight: bold;
  font-size: 17px;
`;
