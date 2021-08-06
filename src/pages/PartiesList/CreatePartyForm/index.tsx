import React, { useRef, useMemo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { format, addDays } from 'date-fns';
import { PulseLoader } from 'react-spinners';

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

  const [isLoading, setIsLoading] = useState(false);

  const { api } = useApi();
  const { getRequestConfig } = useAuth();

  const initialDate = useMemo(() => {
    const date = addDays(Date.now(), 7);
    return format(date, 'yyyy-MM-dd');
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true);
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

        setIsLoading(false);
      }
    },
    [api, getRequestConfig, history],
  );

  const onClickOutside = useCallback(() => {
    if (!isLoading) {
      close();
    }
  }, [close, isLoading]);

  return (
    <Container onClick={onClickOutside}>
      <Panel onClick={e => e.stopPropagation()}>
        <Text>Como vai ser?!</Text>
        <InputsContainer ref={formRef} onSubmit={handleSubmit}>
          <InputBox>
            <Input
              name="name"
              placeholder="Nome do Churras"
              disabled={isLoading}
            />
          </InputBox>
          <InputBox>
            <Input
              name="date"
              type="date"
              placeholder="Data"
              defaultValue={initialDate}
              disabled={isLoading}
            />
          </InputBox>
          <InputBox>
            <Input
              name="description"
              placeholder="Descrição"
              disabled={isLoading}
            />
          </InputBox>
          <InputBox>
            <Input
              name="observation"
              placeholder="Observações adicionais"
              disabled={isLoading}
            />
          </InputBox>

          <ButtonContainer>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <PulseLoader color="#FFD836" size={10} />
              ) : (
                'agendar'
              )}
            </Button>
          </ButtonContainer>
        </InputsContainer>
      </Panel>
    </Container>
  );
};

export default CreatePartyForm;
