import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledView = styled.View`
  flex: 0.8;
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
  flex-direction: row;
  justify-content: center;
`;

export const MainContent = styled.KeyboardAvoidingView`
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

export const SearchExerciseView = styled.View`
  flex: 0.4;
  flex-direction: column;
  // background-color: blue;
  z-index: 1;
`;

export const SetsRepsView = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

export const ExercieseInfoView = styled.View`
  flex: 0.3;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonView = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

export const ExerciseButton = styled.TouchableOpacity`
  background-color: ${COLORS.blue};
  height: 50px;
  width: 70%;
  margin: 10px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const DeleteButton = styled(ExerciseButton)`
  background-color: ${COLORS.red};
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;
