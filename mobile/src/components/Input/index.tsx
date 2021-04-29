import React from 'react';
import { Container, TextInput, Icon } from './styles';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  icon: any;
  name: string;
}

const Input: React.FC<InputProps> = ({ icon, name, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color='#666360' />

      <TextInput
        placeholderTextColor='#666360'
        keyboardAppearance='dark'
        {...rest}
      />
    </Container>
  );
};

export default Input;
