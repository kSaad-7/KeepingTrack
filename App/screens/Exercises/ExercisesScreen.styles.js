import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const StyledContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #1a1a1a;
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
