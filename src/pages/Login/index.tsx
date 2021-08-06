import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';

import {
  Container,
  Content,
  TitleContainer,
  InputsContainer,
  InputBox,
  InputLabel,
  ButtonContainer,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(() => {
    console.log('Login submitted');
  }, []);

  return (
    <Container>
      <Content>
        <TitleContainer>Agenda de Churras</TitleContainer>

        <InputsContainer ref={formRef} onSubmit={handleSubmit}>
          <InputBox>
            <InputLabel>Login</InputLabel>
            <Input name="email" placeholder="e-mail" type="email" />
          </InputBox>
          <InputBox>
            <InputLabel>Senha</InputLabel>
            <Input
              id="password"
              name="password"
              placeholder="senha"
              type="password"
            />
          </InputBox>

          <ButtonContainer>
            <Button>Entrar</Button>
          </ButtonContainer>
        </InputsContainer>
      </Content>
      <Footer />
    </Container>
  );
};

export default Login;
