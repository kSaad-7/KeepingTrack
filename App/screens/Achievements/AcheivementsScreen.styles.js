import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const HeaderView = styled.View`
  flex: 0.15;
  // align-items: center;
  justify-content: space-between;
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
  max-height: 30px;
  min-height: 30px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
`;

export const FilterSection = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
