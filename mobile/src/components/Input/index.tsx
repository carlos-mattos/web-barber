import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Container, TextInput, Icon } from './styles';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
  icon: any;
  name: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus: () => void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { icon, name, ...rest },
  ref
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <Container>
      <Icon name={icon} size={20} color='#666360' />

      <TextInput
        ref={inputElementRef}
        placeholderTextColor='#666360'
        keyboardAppearance='dark'
        defaultValue={defaultValue}
        onChangeText={(value) => (inputValueRef.current.value = value)}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
