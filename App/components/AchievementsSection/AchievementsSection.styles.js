import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  background-color: ${COLORS.itemGrey};
  margin: 10px;
  height: 70px;
  border-radius: 7px;
  flex-direction: row;
`;

export const PictureView = styled.View`
  flex: 0.2;
  //   background-color: pink;
  border-left-width: 5px;
  border-left-color: ${COLORS.blue};
`;

export const TextView = styled.View`
  flex: 0.8;
  justify-content: center;
  padding-left: 10px;
  margin-vertical: 2px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: ${COLORS.blue};
`;

export const Description = styled.Text`
  color: ${COLORS.offWhite};
  margin-top: 5px;
`;
