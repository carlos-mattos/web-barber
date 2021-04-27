import React from 'react';
import { Container, Background, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />

        <form>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="text"
            placeholder="Password"
          />

          <Button type="submit">Entrar</Button>

          <a href="# ">Esqueci minha senha</a>
        </form>

        <a href="# ">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
