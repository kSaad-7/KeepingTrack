import styled from 'styled-components';
import {COLORS} from '../../assets/appColors/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.backgroundBlack};
`;

export const Header = styled.View`
  flex: 0.05;
  flex-direction: row;
  justify-content: center;
`;

export const ScreenTitle = styled.Text`
  flex: 0.4;
  color: white;
  font-weight: bold;
  font-size: 15px;
`;

export const BackTouchable = styled.TouchableOpacity`
  flex: 0.33;
  margin: 0px 5px;
  flex-direction: row;
  // background-color: red;
`;

export const BackTouchableText = styled.Text`
  color: ${COLORS.blue};
`;

export const PlansView = styled.ScrollView`
  flex: 1;
  margin-top: 50px;
  // background-color: green;
`;
