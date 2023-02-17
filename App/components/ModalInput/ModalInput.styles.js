import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  flex-direction: row;
`;

export const StyledInput = styled.TextInput`
height: 40px
width: 50px;
border-width: 1px;
border-radius: 5px;
border-color: ${COLORS.blue};
background-color: ${COLORS.backgroundBlack};
padding: 10px;
margin-vertical: 10px;
margin-horizontal: 10px;
color: ${COLORS.offWhite};
font-size: 16px;`;

export const Label = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 14px;
  font-weight: bold;
`;
