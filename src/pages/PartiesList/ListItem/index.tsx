import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import {
  Container,
  Content,
  TopContainer,
  BottomContainer,
  DateTitle,
  Title,
  InfoContainer,
  InfoText,
} from './styles';

import getCurrencyFormatted from '../../../utils/getCurrencyFormatted';

import { ReactComponent as IconPeople } from '../../../assets/icon_people.svg';
import { ReactComponent as IconMoney } from '../../../assets/icon_money.svg';

interface Props {
  partyId: string;
  date: number;
  title: string;
  countUsers: number;
  totalValue: number;
}

function ListItem({ partyId, date, title, countUsers, totalValue }: Props) {
  const history = useHistory();

  const getCurrency = useMemo((): string => {
    return getCurrencyFormatted(totalValue);
  }, [totalValue]);

  const accessParty = useCallback(() => {
    history.push(`/churrasco/${partyId}`);
  }, [partyId, history]);

  return (
    <Container onClick={accessParty}>
      <Content>
        <TopContainer>
          <DateTitle>{format(date, 'dd/MM')}</DateTitle>
          <Title>{title}</Title>
        </TopContainer>
        <BottomContainer>
          <InfoContainer>
            <IconPeople />
            <InfoText>{countUsers}</InfoText>
          </InfoContainer>
          <InfoContainer>
            <IconMoney />
            <InfoText>{getCurrency}</InfoText>
          </InfoContainer>
        </BottomContainer>
      </Content>
    </Container>
  );
}

export default React.memo(ListItem);
