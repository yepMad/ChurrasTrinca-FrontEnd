import React, { useRef, useCallback, useState } from 'react';
import axios from 'axios';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';
import { usePopup } from '../../../hooks/popup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import CurrencyInput from '../../../components/CurrencyInput';
import GenericPopup from '../../../components/GenericPopup';
import Button from '../../../components/GenericPopup/addons/Button';

import { PartyUser } from '..';

import { Text, InputBox, InputsContainer } from './styles';

interface Props {
  partyId: string;

  onNewUserAdded: (data: PartyUser) => void;
  close: () => void;
}

interface FormData {
  inviteUserEmail: string;
  generalValue: string;
  drinksValue: string;
}

const AddUserForm: React.FC<Props> = ({
  partyId,
  close,
  onNewUserAdded,
}: Props) => {
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { api } = useApi();
  const { addPopup } = usePopup();
  const { getRequestConfig } = useAuth();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          inviteUserEmail: Yup.string()
            .email()
            .required('Insira um e-mail válido!'),
          generalValue: Yup.string().required(
            'O valor geral precisa ser maior ou igual a zero',
          ),
          drinksValue: Yup.string().required(
            'O valor dos drinks precisa ser maior ou igual a zero',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const stringGeneral = data.generalValue
          .replace('R$', '')
          .replace(/\s/g, '')
          .replace('.', '')
          .replace(',', '.');
        const stringDrinks = data.drinksValue
          .replace('R$', '')
          .replace(/\s/g, '')
          .replace('.', '')
          .replace(',', '.');

        const generalValue = parseFloat(stringGeneral);
        const drinksValue = parseFloat(stringDrinks);

        if (generalValue < 0) {
          throw new Error('O valor geral precisa ser maior ou igual a zero');
        }

        if (drinksValue < 0) {
          throw new Error(
            'O valor dos drinks precisa ser maior ou igual a zero',
          );
        }

        const response = await api().post<PartyUser>(
          '/parties/users',
          {
            party_id: partyId,
            invite_user_email: data.inviteUserEmail,
            general_value: generalValue,
            drinks_value: drinksValue,
          },
          getRequestConfig(),
        );

        onNewUserAdded(response.data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        if (error instanceof Error && !axios.isAxiosError(error)) {
          addPopup({
            description: error.message,
            type: 'error',
          });
        }

        setIsLoading(false);
      }
    },
    [addPopup, partyId, api, getRequestConfig, onNewUserAdded],
  );

  return (
    <GenericPopup isLoading={isLoading} onClickOutside={close}>
      <Text>Racha a conta!</Text>
      <InputsContainer ref={formRef} onSubmit={handleSubmit}>
        <InputBox>
          <Input
            type="email"
            name="inviteUserEmail"
            placeholder="e-mail do participante"
            disabled={isLoading}
          />
        </InputBox>
        <InputBox>
          <CurrencyInput
            name="generalValue"
            defaultValue="0,00"
            disabled={isLoading}
            decimalScale={2}
          />
        </InputBox>
        <InputBox>
          <CurrencyInput
            name="drinksValue"
            defaultValue="0,00"
            disabled={isLoading}
            decimalScale={2}
          />
        </InputBox>

        <Button isLoading={isLoading} text="adicionar" />
      </InputsContainer>
    </GenericPopup>
  );
};

export default AddUserForm;
