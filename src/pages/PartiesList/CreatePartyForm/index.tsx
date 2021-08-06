import React, { useRef, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { format, addDays } from 'date-fns';
import * as Yup from 'yup';

import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

import getValidationErrors from '../../../utils/getValidationErrors';

import {
  Container,
  Panel,
  Text,
  InputsContainer,
  InputBox,
  ButtonContainer,
  Button,
} from './styles';

import Input from '../../../components/Input';

interface Props {
  close: () => void;
}

interface FormData {
  name: string;
  date: string;
  description: string;
  observation: string;
}

interface Response extends FormData {
  id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

const CreatePartyForm: React.FC<Props> = ({ close }: Props) => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { api } = useApi();
  const { getRequestConfig } = useAuth();

  const initialDate = useMemo(() => {
    const date = addDays(Date.now(), 7);
    return format(date, 'yyyy-MM-dd');
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(4, 'No mínimo 4 e no máximo 34 dígitos')
            .max(34, 'No mínimo 4 e no máximo 34 dígitos'),
          date: Yup.date().required(),
          description: Yup.string()
            .min(4, 'No mínimo 4 e no máximo 100 dígitos')
            .max(250, 'No mínimo 4 e no máximo 100 dígitos'),
          observation: Yup.string()
            .min(4, 'No mínimo 4 e no máximo 250 dígitos')
            .max(250, 'No mínimo 4 e no máximo 250 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api().post<Response>(
          '/parties',
          data,
          getRequestConfig(),
        );

        history.push(`/churrasco/${response.data.id}`);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [api, getRequestConfig, history],
  );

  return (
    <Container onClick={() => close()}>
      <Panel onClick={e => e.stopPropagation()}>
        <Text>Como vai ser?!</Text>
        <InputsContainer ref={formRef} onSubmit={handleSubmit}>
          <InputBox>
            <Input name="name" placeholder="Nome do Churras" />
          </InputBox>
          <InputBox>
            <Input
              name="date"
              type="date"
              placeholder="Data"
              defaultValue={initialDate}
            />
          </InputBox>
          <InputBox>
            <Input name="description" placeholder="Descrição" />
          </InputBox>
          <InputBox>
            <Input name="observation" placeholder="Observações adicionais" />
          </InputBox>

          <ButtonContainer>
            <Button type="submit">agendar</Button>
          </ButtonContainer>
        </InputsContainer>
      </Panel>
    </Container>
  );
};

export default CreatePartyForm;
