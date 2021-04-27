import React, { useCallback, useRef } from 'react';
import { Container, Background, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Object) => {
    try {
      formRef.current?.setErrors({});

      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await validationSchema.validate(data, { abortEarly: false });
    } catch (error) {
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="text"
            placeholder="Password"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="# ">
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
