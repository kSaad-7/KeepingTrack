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

export const EmptyView = styled.View`
  flex: 0.33;
`;

export const TitleView = styled.View`
  flex: 0.33;
  justify-content: flex-start;
  align-items: center;
  margin-right: 5px;
`;

export const ScreenTitle = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const ExercisesScrollView = styled.ScrollView`
  flex: 1;
  margin: 0px 20px;
`;

export const AddNewExerciseView = styled.View`
  margin-top: 20px;
  align-items: center;
`;

export const NewExerciseTouchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.blue};
  border-radius: 5px;
  width: 28px;
  height: 30px;
`;
