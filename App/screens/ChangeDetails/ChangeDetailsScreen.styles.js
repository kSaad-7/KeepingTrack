import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const InputView = styled.View`
  flex: 0.6;
  margin-top: 7%;
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
  margin-top: 10px;
  flex: 1;
`;

export const DetailName = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-left: 3%;
`;

export const ButtonView = styled.View`
  flex: 0.4;
  //   margin-top: 10px;
`;

export const ChangeTouchable = styled.TouchableOpacity`
  background-color: ${COLORS.blue}
  color: white;
  height: 60px;
  margin: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ChangeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
