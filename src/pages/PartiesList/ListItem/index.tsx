import React, { useMemo } from 'react';
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
  date: number;
  title: string;
  countUsers: number;
  totalValue: number;
}

function ListItem({ date, title, countUsers, totalValue }: Props) {
  const getCurrency = useMemo((): string => {
    return getCurrencyFormatted(totalValue);
  }, [totalValue]);

  return (
    <Container>
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
