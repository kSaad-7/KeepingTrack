import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  flex: 0.4;
  justify-content: center;
  z-index: -1;
  margin: 0px 30px;
`;

export const StyledInput = styled.TextInput`
  background-color: ${COLORS.backgroundBlack};
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  color: ${COLORS.offWhite};
`;
