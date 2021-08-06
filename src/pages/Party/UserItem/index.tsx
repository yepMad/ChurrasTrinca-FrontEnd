import React, { useMemo, useCallback, useState } from 'react';
import { BiDrink } from 'react-icons/bi';
import { IoFastFoodOutline, IoCloseCircle } from 'react-icons/io5';
import { PuffLoader } from 'react-spinners';

import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

import getCurrencyFormatted from '../../../utils/getCurrencyFormatted';

import { PartyUser } from '..';

import {
  Container,
  RightContent,
  CloseButton,
  OptionsContainer,
  Circle,
  UserNameText,
  LeftContent,
  PriceContent,
  Price,
  Line,
} from './styles';

interface Props extends PartyUser {
  owner_id: string;
  isUserPartyOwner: boolean;

  onStateUpdate: (data: PartyUser) => void;
}

function UserItem(props: Props) {
  const {
    id,
    user_id,
    owner_id,
    isUserPartyOwner,
    name,
    itsPaid,
    general_value,
    drinks_value,
    onStateUpdate,
  } = props;

  const { api } = useApi();
  const { getRequestConfig } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const updatePaymentStatus = useCallback(
    async (paid: boolean) => {
      try {
        setIsLoading(true);

        const { data } = await api().put<PartyUser>(
          `/parties/users/${id}`,
          { itsPaid: paid },
          getRequestConfig(),
        );

        onStateUpdate(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [id, api, getRequestConfig, onStateUpdate],
  );

  const getGeneralValue = useMemo((): string => {
    return getCurrencyFormatted(general_value);
  }, [general_value]);

  const getDrinksValue = useMemo((): string => {
    return getCurrencyFormatted(drinks_value);
  }, [drinks_value]);

  const getUserName = useMemo((): string => {
    const userNames = name.split(' ');

    const suffix = userNames.length >= 2 ? ` ${userNames[1][0]}.` : '';
    return `${userNames[0]}${suffix}`;
  }, [name]);

  return (
    <>
      <Container>
        <RightContent>
          <OptionsContainer>
            {isUserPartyOwner && user_id !== owner_id && (
              <CloseButton>
                <IoCloseCircle size={20} />
              </CloseButton>
            )}

            {isLoading ? (
              <PuffLoader size={25} />
            ) : (
              <Circle
                onClick={() => updatePaymentStatus(!itsPaid)}
                itsChecked={itsPaid}
              />
            )}
          </OptionsContainer>
          <UserNameText>{getUserName}</UserNameText>
        </RightContent>
        <LeftContent>
          <PriceContent itsPaid={itsPaid}>
            <IoFastFoodOutline color="#FFD836" size={20} />
            <Price>{getGeneralValue}</Price>
          </PriceContent>
          <PriceContent itsPaid={itsPaid}>
            <BiDrink color="#FFD836" size={20} />
            <Price>{getDrinksValue}</Price>
          </PriceContent>
        </LeftContent>
      </Container>
      <Line />
    </>
  );
}

export default React.memo(UserItem, (prevProps, nextProps) => {
  return prevProps.itsPaid === nextProps.itsPaid;
});
