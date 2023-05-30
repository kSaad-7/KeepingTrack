import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const ImageBackgroundContainer = styled.ImageBackground`
  flex: 1;
  align-items: center;
`;

export const Header = styled.View`
  flex: 0.25;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledHeaderView = styled.View`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
`;

export const BlueText = styled.Text`
  color: ${COLORS.blue};
  font-weight: 800;
  font-size: 18px;
`;

export const ButtonView = styled.View`
  flex: 0.75;
  width: 100%;
  padding-bottom: 20%;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledView = styled.View`
  justify-content: center;
  width: 95%;
  align-items: center;
`;

export const StyledText = styled.Text`
  color: ${COLORS.offWhite};
  font-weight: bold;
  font-size: 35px;
  padding: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  border-radius: 7px;
  padding: 13px;
  width: 80%;
  align-items: center;
  margin-top: 10%;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const RegisterButton = styled(LoginButton)`
  border: 1px solid ${COLORS.blue};
  background-color: transparent;
  margin-top: 25px;
`;
