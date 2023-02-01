import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
  align-items: center;
`;

export const Logo = styled.Image`
  flex: 0.3;
  width: 500px;
  height: 300px;
`;

export const InputView = styled.View`
  flex: 0.5;
  border-radius: 10px;
  min-width: 90%;
  min-height: 10%;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  color: white;
  height: 60px;
  margin: 30px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const LoginButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const RegisterView = styled.View`
  flex: 0.2;
  justify-content: flex-end;
`;

export const NeedAccountText = styled.Text`
  font-size: 16px;
  color: white;
`;

export const RegisterText = styled.Text`
  font-size: 17px;
  font-style: italic;
  color: ${COLORS.blue};
  font-weight: bold;
`;
