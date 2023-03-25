import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

import {CustomInput} from '../CustomInput/CustomInput';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledView = styled.View`
  flex: 0.55;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const ModalContent = styled.View`
  flex: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${COLORS.itemGrey};
`;

export const BackTouchable = styled.TouchableOpacity`
  flex: 0.15;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const MainContent = styled.View`
  flex: 0.9;
  justify-content: center;
  align-items: center;
  // background-color: blue;
`;

export const StyledCustomInput = styled(CustomInput)`
  width: 70%;
  height: 13%;
`;

export const NewDayButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  color: white;
  height: 13%;
  width: 70%;
  margin: 30px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const NewDayButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
