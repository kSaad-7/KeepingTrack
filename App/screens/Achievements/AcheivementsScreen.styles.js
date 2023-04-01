import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const HeaderView = styled.View`
  flex: 0.15;
`;

export const StyledView = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const ScreenTitle = styled.Text`
  flex: 0.33;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

export const StatsTouchable = styled.TouchableOpacity`
  flex: 0.33;
  flex-direction: row;
  justify-content: flex-end;
`;

export const FilterSection = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
