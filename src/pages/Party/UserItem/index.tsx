import React, { useMemo, useCallback, useState } from 'react';
import { BiDrink } from 'react-icons/bi';
import { IoFastFoodOutline, IoCloseCircle, IoPencil } from 'react-icons/io5';
import { PuffLoader } from 'react-spinners';

import { useApi } from '../../../hooks/api';
import { useAuth } from '../../../hooks/auth';

import getCurrencyFormatted from '../../../utils/getCurrencyFormatted';

import { PartyUser, EditingUser } from '..';

import {
  Container,
  RightContent,
  EditButton,
  DeleteButton,
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

  editUser: (data: EditingUser) => void;
  onStateUpdate: (data: PartyUser) => void;
  onDelete: (id: string) => void;
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
    onDelete,
    editUser,
  } = props;

  const { api } = useApi();
  const { getRequestConfig, user } = useAuth();

  const [isLoadingPaidStatus, setIsLoadingPaidStatus] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const updatePaymentStatus = useCallback(
    async (paid: boolean) => {
      try {
        setIsLoadingPaidStatus(true);

        const { data } = await api().put<PartyUser>(
          `/parties/users/${id}`,
          { itsPaid: paid },
          getRequestConfig(),
        );

        onStateUpdate(data);
        setIsLoadingPaidStatus(false);
      } catch (error) {
        setIsLoadingPaidStatus(false);
      }
    },
    [id, api, getRequestConfig, onStateUpdate],
  );

  const deleteUserParty = useCallback(async () => {
    try {
      setIsLoadingDelete(true);

      await api().delete(`/parties/users/${id}`, getRequestConfig());
      onDelete(id);
    } catch (error) {
      setIsLoadingDelete(false);
    }
  }, [api, id, getRequestConfig, onDelete]);

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

  const editIcon = useMemo(() => {
    if (!isUserPartyOwner) {
      return null;
    }

    return (
      <EditButton
        onClick={() =>
          editUser({
            userName: name,
            partyUserId: id,
            initialDrinksValue: drinks_value,
            initialGeneralValue: general_value,
          })
        }
      >
        <IoPencil size={20} />
      </EditButton>
    );
  }, [id, isUserPartyOwner, editUser, general_value, drinks_value, name]);

  const deleteIcon = useMemo(() => {
    if (isUserPartyOwner && user_id === owner_id) {
      return null;
    }

    if (!isUserPartyOwner && user_id !== user.id) {
      return null;
    }

    if (isLoadingDelete) {
      return <PuffLoader size={25} />;
    }

    return (
      <DeleteButton onClick={() => deleteUserParty()}>
        <IoCloseCircle size={20} />
      </DeleteButton>
    );
  }, [
    deleteUserParty,
    isLoadingDelete,
    isUserPartyOwner,
    owner_id,
    user,
    user_id,
  ]);

  return (
    <>
      <Container>
        <RightContent>
          <OptionsContainer>
            {deleteIcon}

            {editIcon}

            {isLoadingPaidStatus ? (
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

export default React.memo(UserItem);
