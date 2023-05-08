import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledView = styled.View`
  width: 90%;
  height: 50px;
  margin: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${COLORS.itemGrey};
  border-radius: 10px;
`;

export const UserName = styled.Text`
  color: ${COLORS.offWhite};
  font-weight: 600;
  font-size: 15px;
`;

export const Points = styled.Text`
  color: ${COLORS.blue};
  font-weight: bold;
  font-size: 14px;
`;
