import React, { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

import { ListContainer, LoadingContainer } from './styles';

import { useApi } from '../../hooks/api';
import { useAuth } from '../../hooks/auth';

import CreatePartyForm from './CreatePartyForm';
import AddItem from './AddItem';
import ListItem from './ListItem';

import GenericPage from '../../components/GenericPage';

interface Item {
  id: string;
  title: string;
  date_timestamp: number;
  count_users: number;
  total_value: number;
}

const PartiesList: React.FC = () => {
  const { getRequestConfig } = useAuth();
  const { api } = useApi();

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingAddForm, setIsShowingAddForm] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        const response = await api().get<Item[]>(
          '/parties',
          getRequestConfig(),
        );

        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetch();
  }, [api, getRequestConfig]);

  return (
    <>
      <GenericPage title="Agenda de Churras">
        <ListContainer>
          {items.map(item => (
            <ListItem
              key={item.id}
              partyId={item.id}
              date={item.date_timestamp}
              title={item.title}
              countUsers={item.count_users}
              totalValue={item.total_value}
            />
          ))}

          <AddItem onClick={() => setIsShowingAddForm(true)} />
        </ListContainer>

        {isLoading && (
          <LoadingContainer>
            <PulseLoader color="#ccc9bd" />
          </LoadingContainer>
        )}
      </GenericPage>

      {isShowingAddForm && (
        <CreatePartyForm close={() => setIsShowingAddForm(false)} />
      )}
    </>
  );
};

export default PartiesList;
