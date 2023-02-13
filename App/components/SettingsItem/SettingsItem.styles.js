import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.TouchableOpacity`
  background-color: ${props =>
    props.isDeleteAccount ? '#f44' : COLORS.itemGrey}
  width: 80%;
  padding: 15px;
  border-radius: 10px;
  justify-content: space-between;
  margin-vertical: 13px;
  flex-direction: row;
`;

export const TitleText = styled.Text`
  color: white;
  font-weight: bold;
`;
