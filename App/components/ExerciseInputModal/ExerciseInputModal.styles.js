import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  // background-color: rgba(0, 0, 0, 0.9);
`;

export const StyledView = styled.View`
  flex: 0.64;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: black;
`;

export const ModalContent = styled.View`
  flex: 1;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: ${COLORS.itemGrey};
`;

export const TopHeaderView = styled.View`
  flex: 0.06;
  flex-direction: row;
  justify-content: center;
`;

export const BackTouchable = styled.TouchableOpacity`
  flex-direction: row;
`;

export const MainContent = styled.View`
  flex: 1;
  margin-top: 5%;
`;

export const ModalTitleView = styled.View`
  flex: 0.1;
  align-items: center;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
