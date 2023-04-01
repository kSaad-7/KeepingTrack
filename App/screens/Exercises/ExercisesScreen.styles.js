import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const TopHeaderView = styled.View`
  flex: 0.05
  flex-direction: row;
  justify-content: space-between;
`;

export const BackTouchable = styled.TouchableOpacity`
  flex: 0.33;
  margin-left: 5px;
  flex-direction: row;
`;

export const BackTouchableText = styled.Text`
  color: ${COLORS.blue};
`;

export const DeleteTouchable = styled.TouchableOpacity`
  flex: 0.2;
  background-color: #f445;
  border: 1px solid ${COLORS.red};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

export const DeleteText = styled.Text`
  color: ${COLORS.offWhite};
  font-size: 13px;
  font-weight: bold;
`;

export const TitleView = styled.View`
  flex: 0.1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ScreenTitle = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  margin-right: 20px;
`;

export const ExercisesScrollView = styled.ScrollView`
  flex: 1;
  margin: 10px 20px;
`;

export const AddNewExerciseView = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export const NewExerciseTouchable = styled.TouchableOpacity`
  // background-color: ${COLORS.offWhite};
`;
