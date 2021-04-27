import React from 'react';
import { Container, Background, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />

        <form>
          <h1>Faça seu logOn</h1>

          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Password" />

          <button type="submit">Entrar</button>

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
