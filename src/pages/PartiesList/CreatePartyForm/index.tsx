import React, { useRef, useMemo, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { format, addDays } from 'date-fns';

import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import GenericPopup from '../../../components/GenericPopup';
import Button from '../../../components/GenericPopup/addons/Button';

import { Text, InputBox, InputsContainer } from './styles';

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

  return (
    <GenericPopup isLoading={isLoading} onClickOutside={close}>
      <Text>Como vai ser?!</Text>
      <InputsContainer ref={formRef} onSubmit={handleSubmit}>
        <InputBox>
          <Input
            name="name"
            placeholder="nome do churras"
            disabled={isLoading}
          />
        </InputBox>
        <InputBox>
          <Input
            name="date"
            type="date"
            placeholder="data"
            defaultValue={initialDate}
            disabled={isLoading}
          />
        </InputBox>
        <InputBox>
          <Input
            name="description"
            placeholder="descrição"
            disabled={isLoading}
          />
        </InputBox>
        <InputBox>
          <Input
            name="observation"
            placeholder="observações adicionais"
            disabled={isLoading}
          />
        </InputBox>

        <Button isLoading={isLoading} text="agendar" />
      </InputsContainer>
    </GenericPopup>
  );
};

export default CreatePartyForm;
