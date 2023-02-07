import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #1a1a1a;
`;

export const BackTouchable = styled.TouchableOpacity`
  margin: 0px 5px;
  flex-direction: row;
  align-items: center;
`;

export const BackTouchableText = styled.Text`
  color: ${COLORS.blue};
`;

export const StyledView = styled.View`
  margin-top: 20px;
  flex: 0.4;
  background-color: #1a1a1a;
  padding: 20px;
`;

export const Heading = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 15px;
`;

export const StyledParagraph = styled.Text`
  color: white;
  font-size: 16px;
`;

export const RedText = styled.Text`
  color: ${COLORS.red}
  font-style: italic;
  font-weight: bold;
`;

export const TypeCodeText = styled.Text`
  color: white;
  margin-top: 30px;
  font-size: 15px;
`;

export const Code = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const DeleteAccountButton = styled.TouchableOpacity`
  background-color: ${COLORS.red}
  color: white;
  height: 60px;
  margin: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
