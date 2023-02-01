import styled from 'styled-components';
import {StyledTextInput} from '../../components/CustomInput/CustomInput.styles';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
  align-items: center;
`;

export const Logo = styled.Image`
  flex: 0.4;
  width: 400px;
  height: 150px;
`;

export const InputView = styled.View`
  flex: 0.9;
  // background-color: red;
  min-width: 90%;
  min-height: 15%;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  color: white;
  height: 60px;
  margin: 30px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const RegisterButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

export const LoginView = styled.View`
  flex: 0.1;
  justify-content: flex-end;
`;

export const AlreadyHaveAccountText = styled.Text`
  font-size: 16px;
  color: white;
`;

export const LoginText = styled.Text`
  font-size: 17px;
  font-style: italic;
  color: ${COLORS.blue};
  font-weight: bold;
`;
