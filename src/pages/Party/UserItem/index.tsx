import React, { useMemo } from 'react';
import { BiDrink } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';

import getCurrencyFormatted from '../../../utils/getCurrencyFormatted';

import {
  Container,
  RightContent,
  Circle,
  UserNameText,
  LeftContent,
  PriceContent,
  Price,
  Line,
} from './styles';

interface Props {
  user_id: string;
  user_name: string;
  its_paid: boolean;
  general_value: number;
  drinks_value: number;
}

function UserItem(data: Props) {
  const { user_id, user_name, its_paid, general_value, drinks_value } = data;

  const getGeneralValue = useMemo((): string => {
    return getCurrencyFormatted(general_value);
  }, [general_value]);

  const getDrinksValue = useMemo((): string => {
    return getCurrencyFormatted(drinks_value);
  }, [drinks_value]);

  const getUserName = useMemo((): string => {
    const userNames = user_name.split(' ');

    const suffix = userNames.length >= 2 ? ` ${userNames[1][0]}.` : '';
    return `${userNames[0]}${suffix}`;
  }, [user_name]);

  return (
    <>
      <Container>
        <RightContent>
          <Circle itsChecked={its_paid} />
          <UserNameText>{getUserName}</UserNameText>
        </RightContent>
        <LeftContent>
          <PriceContent>
            <IoFastFoodOutline color="#FFD836" size={20} />
            <Price>{getGeneralValue}</Price>
          </PriceContent>
          <PriceContent>
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
