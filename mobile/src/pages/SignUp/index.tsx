import React, { useCallback, useRef } from 'react';
import logoImg from '../../assets/logo.png';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback((data: object) => {}, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form onSubmit={handleSignUp} ref={formRef}>
              <Input
                name='name'
                icon='user'
                placeholder='Nome'
                autoCapitalize='words'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus;
                }}
              />
              <Input
                name='email'
                icon='mail'
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus;
                }}
              />
              <Input
                name='password'
                icon='lock'
                placeholder='Senha'
                secureTextEntry
                textContentType='newPassword'
                returnKeyType='send'
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Feather name='arrow-left' size={20} color='#fff' />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
