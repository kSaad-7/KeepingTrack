import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const TouchableContainer = styled.TouchableOpacity`
  flex: 0.25;
  max-height: 30px;
  min-height: 30px;
  z-index: -1;
  margin: 10px 80px;
  background-color: ${COLORS.blue};
  justify-content: center;
  border-radius: 20px;
`;

export const StlyedView = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Label = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 16px;
  font-weight: 600;
  margin-horizontal: 10px;
`;
