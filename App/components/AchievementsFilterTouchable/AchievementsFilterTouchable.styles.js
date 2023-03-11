import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const TouchableContainer = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  padding: 10px;
  border-radius: 10px;
  width: 30%;
  align-items: center;
`;

export const Label = styled.Text`
  color: white;
  font-weight: bold;
`;
