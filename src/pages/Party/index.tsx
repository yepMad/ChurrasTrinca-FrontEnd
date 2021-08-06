import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import { useApi } from '../../hooks/api';
import { useAuth } from '../../hooks/auth';

import getCurrencyFormatted from '../../utils/getCurrencyFormatted';
import GenericPage from '../../components/GenericPage';

import {
  Content,
  HeaderContainer,
  InfosContainer,
  ResumeContainer,
  DateTitle,
  Title,
  InfoContainer,
  InfoText,
  UsersContainer,
} from './styles';

import { ReactComponent as IconPeople } from '../../assets/icon_people.svg';
import { ReactComponent as IconMoney } from '../../assets/icon_money.svg';

import UserItem from './UserItem';

interface Params {
  partyId: string;
}

interface PartyInfos {
  id: string;
  title: string;
  date_timestamp: number;
  count_users: number;
  total_value: number;
}

interface PartyUser {
  id: string;
  user_id: string;
  name: string;
  general_value: number;
  drinks_value: number;
  itsPaid: boolean;
}

interface Response {
  party_infos: PartyInfos;
  party_users: PartyUser[];
  is_owner: boolean;
}

const Party: React.FC = () => {
  const history = useHistory();
  const { partyId } = useParams<Params>();

  const { api } = useApi();
  const { getRequestConfig } = useAuth();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(Date.now());
  const [countUsers, setCountUsers] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [partyUsers, setPartyUsers] = useState<PartyUser[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api().get<Response>(
          `/parties/${partyId}`,
          getRequestConfig(),
        );

        setTitle(data.party_infos.title);
        setDate(data.party_infos.date_timestamp);
        setCountUsers(data.party_infos.count_users);
        setTotalValue(data.party_infos.total_value);
        setPartyUsers(data.party_users);
        setIsOwner(data.is_owner);
      } catch {
        history.push('/');
      }
    };

    if (!partyId) {
      history.push('/');
    } else {
      fetch();
    }
  }, [api, history, partyId, getRequestConfig]);

  const getCurrency = useMemo((): string => {
    return getCurrencyFormatted(totalValue);
  }, [totalValue]);

  return (
    <GenericPage title="Agenda de Churras">
      <Content>
        <HeaderContainer>
          <InfosContainer>
            <DateTitle>{format(date, 'dd/MM')}</DateTitle>
            <Title>{title}</Title>
          </InfosContainer>
          <ResumeContainer>
            <InfoContainer>
              <IconPeople />
              <InfoText>{countUsers}</InfoText>
            </InfoContainer>
            <InfoContainer>
              <IconMoney />
              <InfoText>{getCurrency}</InfoText>
            </InfoContainer>
          </ResumeContainer>
        </HeaderContainer>

        <UsersContainer>
          {partyUsers.map(i => (
            <UserItem
              key={i.id}
              user_id={i.user_id}
              its_paid={i.itsPaid}
              general_value={i.general_value}
              drinks_value={i.drinks_value}
              user_name={i.name}
            />
          ))}
        </UsersContainer>
      </Content>
    </GenericPage>
  );
};

export default Party;
