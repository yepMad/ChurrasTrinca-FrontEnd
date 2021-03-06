import React, { useRef, useCallback, useState } from 'react';
import { BiDrink } from 'react-icons/bi';
import { FormHandles } from '@unform/core';
import { IoFastFoodOutline } from 'react-icons/io5';
import * as Yup from 'yup';

import GenericPopup from '../../../components/GenericPopup';
import CurrencyInput from '../../../components/CurrencyInput';
import Button from '../../../components/GenericPopup/addons/Button';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';
import { usePopup } from '../../../hooks/popup';

import { PartyUser, EditingUser } from '..';

import {
  EditTitle,
  EditFormContent,
  EditInputBox,
  EditInputLabel,
} from './styles';

interface Props extends EditingUser {
  close: () => void;
  onStateUpdate: (data: PartyUser) => void;
}

interface FormData {
  generalValue: string;
  drinksValue: string;
}

const EditUser: React.FC<Props> = (props: Props) => {
  const {
    partyUserId,
    userName,
    initialDrinksValue,
    initialGeneralValue,
    close,
    onStateUpdate,
  } = props;

  const { api } = useApi();
  const { getRequestConfig } = useAuth();
  const { addPopup } = usePopup();

  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
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

        const res = await api().put<PartyUser>(
          `/parties/users/${partyUserId}`,
          {
            general_value: generalValue,
            drinks_value: drinksValue,
            itsPaid: false,
          },
          getRequestConfig(),
        );

        onStateUpdate(res.data);
        close();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }

        if (error instanceof Error) {
          addPopup({
            description: error.message,
            type: 'error',
          });
        }

        setIsLoading(false);
      }
    },
    [addPopup, api, getRequestConfig, onStateUpdate, partyUserId, close],
  );

  return (
    <GenericPopup isLoading={isLoading} onClickOutside={() => close()}>
      <EditTitle>{userName}</EditTitle>

      <EditFormContent ref={formRef} onSubmit={handleSubmit}>
        <EditInputBox>
          <EditInputLabel>Valor geral</EditInputLabel>
          <CurrencyInput
            name="generalValue"
            Icon={IoFastFoodOutline}
            defaultValue={initialGeneralValue}
            disabled={isLoading}
            decimalScale={2}
          />
        </EditInputBox>
        <EditInputBox>
          <EditInputLabel>Valor dos drinks</EditInputLabel>
          <CurrencyInput
            name="drinksValue"
            Icon={BiDrink}
            defaultValue={initialDrinksValue}
            disabled={isLoading}
            decimalScale={2}
          />
        </EditInputBox>
        <Button isLoading={isLoading} text="salvar" />
      </EditFormContent>
    </GenericPopup>
  );
};

export default EditUser;
