import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

import LinearGradient from 'react-native-linear-gradient';

export const StyledTouchable = styled.TouchableOpacity`
  flex: 1;
  background-color: ${COLORS.itemGrey}
  margin: 20px 0px;
  padding-left: 10px;
  border-radius: 7px;
`;

export const DayName = styled.Text`
  color: ${COLORS.offWhite}
  font-weight: bold;
  font-size: 17px;
`;

export const Gradient = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  padding-left: 10px;
  border-radius: 7px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;
