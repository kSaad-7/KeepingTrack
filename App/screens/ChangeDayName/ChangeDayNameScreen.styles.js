import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const BackTouchable = styled.TouchableOpacity`
  flex: 0.1;
  margin-left: 5px;
  flex-direction: row;
`;

export const BackTouchableText = styled.Text`
  color: ${COLORS.blue};
`;

export const InputView = styled.View`
  flex: 0.5;
  // background-color: red;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  color: white;
  height: 60px;
  margin: 30px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
