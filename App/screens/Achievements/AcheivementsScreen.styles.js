import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const HeaderView = styled.View`
  flex: 0.15;
  align-items: center;
  justify-content: space-between;
`;

export const ScreenTitle = styled.Text`
  flex: 1;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const FilterSection = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
