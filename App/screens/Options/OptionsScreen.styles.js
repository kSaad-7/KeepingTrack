import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
  align-items: center;
`;

export const ScreenTitle = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const SettingHeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  align-self: flex-start;
  margin-left: 10%;
`;

export const AccountView = styled.View`
  flex: 0.5;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const AccountText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  align-self: flex-start;
`;
