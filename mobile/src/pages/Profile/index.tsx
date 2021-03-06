import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/AuthContext';
import * as ImagePicker from 'expo-image-picker';

interface SignUpFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const { user, updateUser, signOut } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const validationSchema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: any) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Valores não correspondem'),
        });

        await validationSchema.validate(data, { abortEarly: false });

        const { name, email, old_password, password, password_confirmation } =
          data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        navigation.goBack();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          console.log(errors);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Ooops...',
          'Ocorreu um erro ao tentar atualizar seu perfil, tente novamente'
        );
      }
    },
    [navigation, updateUser]
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleBackButton = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleUpdateAvatar = useCallback(async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!response.cancelled) {
      const data = new FormData();

      data.append(
        'avatar',
        JSON.parse(
          JSON.stringify({
            uri: response.uri,
            name: `${user.id}.jpg`,
            type: 'image/jpeg',
          })
        )
      );

      api.patch('users/avatar', data).then((apiResponse) => {
        updateUser(apiResponse.data);
      });
    }
  }, [updateUser, user.id]);

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
            <BackButton onPress={handleBackButton}>
              <Feather name='chevron-left' size={24} color='#999591' />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form
              initialData={{ name: user.name, email: user.email }}
              onSubmit={handleSignUp}
              ref={formRef}
            >
              <Input
                name='name'
                icon='user'
                placeholder='Nome'
                autoCapitalize='words'
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name='email'
                icon='mail'
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                name='old_password'
                icon='lock'
                placeholder='Senha atual'
                secureTextEntry
                textContentType='newPassword'
                containerStyle={{ marginTop: 16 }}
                returnKeyType='next'
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name='password'
                icon='lock'
                placeholder='Nova senha'
                secureTextEntry
                textContentType='newPassword'
                returnKeyType='next'
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                name='password_confirmation'
                icon='lock'
                placeholder='Confirmar senha'
                secureTextEntry
                textContentType='newPassword'
                returnKeyType='send'
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
