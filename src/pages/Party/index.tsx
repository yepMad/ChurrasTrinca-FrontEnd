import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { FiArrowLeft } from 'react-icons/fi';
import { format } from 'date-fns';

import { useApi } from '../../hooks/api';
import { useAuth } from '../../hooks/auth';

import getCurrencyFormatted from '../../utils/getCurrencyFormatted';
import GenericPage from '../../components/GenericPage';

import EditUser from './EditUser';

import {
  Content,
  HeaderContainer,
  InfosContainer,
  ResumeContainer,
  DateTitle,
  Title,
  HeaderDetails,
  DescriptionText,
  ObservationText,
  InfoContainer,
  InfoText,
  UsersContainer,
  LoadingContainer,
  BackButtonContainer,
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
  description: string;
  observation?: string;
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

export interface EditingUser {
  partyUserId: string;
  userName: string;
  initialGeneralValue: number;
  initialDrinksValue: number;
}

const Party: React.FC = () => {
  const history = useHistory();
  const { partyId } = useParams<Params>();

  const { api } = useApi();
  const { getRequestConfig } = useAuth();

  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [observation, setObservation] = useState('');
  const [date, setDate] = useState(Date.now());
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
        setDescription(data.party_infos.description);
        setObservation(data.party_infos.observation || '');
        setOwnerId(data.party_infos.owner_id);
        setDate(data.party_infos.date_timestamp);
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
    const totalValue = partyUsers.reduce(
      (sum, { general_value, drinks_value }) =>
        sum + (general_value + drinks_value),
      0,
    );

    return getCurrencyFormatted(totalValue);
  }, [partyUsers]);

  const onUserStateUpdate = useCallback((data: PartyUser) => {
    setPartyUsers(oldState => {
      const index = oldState.findIndex(i => i.id === data.id);
      const newData = [...oldState];
      newData[index] = data;

      return newData;
    });
  }, []);

  const onDelete = useCallback((id: string) => {
    setPartyUsers(oldState => {
      const index = oldState.findIndex(i => i.id === id);
      const newData = [...oldState];
      newData.splice(index, 1);

      return newData;
    });
  }, []);

  if (loading) {
    return (
      <GenericPage title="Agenda de Churras">
        <Content>
          <div style={{ margin: '0 auto' }}>
            <PulseLoader color="#FFD836" />
          </div>
        </Content>
      </GenericPage>
    );
  }

  return (
    <>
      <GenericPage title="Agenda de Churras">
        <Content>
          <HeaderContainer>
            <InfosContainer>
              <DateTitle>{format(date, 'dd/MM')}</DateTitle>
              <Title>{title}</Title>

              <HeaderDetails>
                <DescriptionText>{description}</DescriptionText>
                <ObservationText>{observation}</ObservationText>
              </HeaderDetails>
            </InfosContainer>
            <ResumeContainer>
              <InfoContainer>
                <IconPeople />
                <InfoText>{partyUsers.length}</InfoText>
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
                name={i.name}
                owner_id={ownerId}
                itsPaid={i.itsPaid}
                user_id={i.user_id}
                onDelete={onDelete}
                editUser={setEditingUser}
                isUserPartyOwner={isOwner}
                drinks_value={i.drinks_value}
                general_value={i.general_value}
                onStateUpdate={onUserStateUpdate}
              />
            ))}
          </UsersContainer>
        </Content>

        <BackButtonContainer>
          <Link to="/churrascos">
            <FiArrowLeft />
            Voltar
          </Link>
        </BackButtonContainer>
      </GenericPage>

      {editingUser && (
        <EditUser
          userName={editingUser.userName}
          onStateUpdate={onUserStateUpdate}
          close={() => setEditingUser(null)}
          partyUserId={editingUser.partyUserId}
          initialGeneralValue={editingUser.initialGeneralValue}
          initialDrinksValue={editingUser.initialDrinksValue}
        />
      )}
    </>
  );
};

export default Party;
