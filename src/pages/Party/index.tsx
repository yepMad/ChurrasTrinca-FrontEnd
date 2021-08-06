import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
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
  LoadingContainer,
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
  owner_id: string;
}

export interface PartyUser {
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

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(Date.now());
  const [countUsers, setCountUsers] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [partyUsers, setPartyUsers] = useState<PartyUser[]>([]);
  const [ownerId, setOwnerId] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const { data } = await api().get<Response>(
          `/parties/${partyId}`,
          getRequestConfig(),
        );

        setTitle(data.party_infos.title);
        setOwnerId(data.party_infos.owner_id);
        setDate(data.party_infos.date_timestamp);
        setCountUsers(data.party_infos.count_users);
        setTotalValue(data.party_infos.total_value);
        setPartyUsers(data.party_users);
        setIsOwner(data.is_owner);

        setLoading(false);
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

  const onUserStateUpdate = useCallback((data: PartyUser) => {
    setPartyUsers(oldState => {
      const index = oldState.findIndex(i => i.id === data.id);
      const newData = [...oldState];
      newData[index] = data;

      return newData;
    });
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <PulseLoader color="#FFD836" />
      </LoadingContainer>
    );
  }

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
              id={i.id}
              owner_id={ownerId}
              itsPaid={i.itsPaid}
              isUserPartyOwner={isOwner}
              user_id={i.user_id}
              general_value={i.general_value}
              drinks_value={i.drinks_value}
              name={i.name}
              onStateUpdate={onUserStateUpdate}
            />
          ))}
        </UsersContainer>
      </Content>
    </GenericPage>
  );
};

export default Party;
