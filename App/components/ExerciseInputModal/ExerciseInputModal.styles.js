import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
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

export const SearchExercise = styled.View`
  flex: 0.2;
  flex-direction: row;
  // background-color: red;
  margin-left: 20px;
`;

export const SetsRepsView = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

export const ExercieseInfoView = styled.View`
  flex: 0.3;
  align-items: center;
`;

export const ButtonView = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items: center;
`;

export const ExerciseButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  color: white;
  height: 60px;
  width: 70%;
  margin: 30px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
