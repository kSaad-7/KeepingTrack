import styled from 'styled-components';
import {TextInput} from 'react-native';

export const StyledTextInput = styled(TextInput)`
  height: ${props => (props.isRegister ? '10%' : '14%')}
  margin: ${props => (props.isRegister ? '15px 10px' : '20px 15px')}
  background-color: ${props => (props.isDeleteInput ? '#474747' : '#131313aa')}
  padding: 10px;
  color: white;
  font-size: 17px;
  border-radius: 10px;
`;
