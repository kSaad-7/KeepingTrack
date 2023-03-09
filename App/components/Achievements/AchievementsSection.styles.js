import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.itemGrey};
  margin: 13px 7px;
  height: 80px;
  border-radius: 7px;
  flex-direction: row;
`;

export const PictureView = styled.View`
  flex: 0.2;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border-left-width: 5px;
  border-left-color: ${COLORS.blue};
`;

export const Logo = styled.Image`
  width: 60px;
  height: 60px;
`;

export const TextView = styled.View`
  flex: 0.6;
  justify-content: center;
  padding-left: 10px;
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

export const PointsView = styled.View`
  flex: 0.2;
  // background-color: pink;
  justify-content: center;
  align-items: center;
`;

export const Points = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: ${COLORS.red};
`;
