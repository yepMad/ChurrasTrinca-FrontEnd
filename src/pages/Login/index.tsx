import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';

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

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/auth';
import { usePopup } from '../../hooks/popup';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addPopup } = usePopup();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string()
            .min(6, 'No mínimo 6 e no máximo 18 dígitos')
            .max(18, 'No mínimo 6 e no máximo 18 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (error) {
        setLoading(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }

        if (axios.isAxiosError(error)) {
          const { response } = error as AxiosError<ChurrasTrinca.ApiError>;

          if (response) {
            addPopup({ description: response.data.message, type: 'error' });
            return;
          }
        }

        addPopup({
          description: 'Desculpe! Algo inesperado aconteceu.',
          type: 'error',
        });
      }
    },
    [signIn, addPopup],
  );

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
            <Button type="submit">Entrar</Button>
          </ButtonContainer>
        </InputsContainer>
      </Content>
      <Footer />
    </Container>
  );
};

export default Login;
