import React, { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

import {
  Container,
  Content,
  Header,
  ListContainer,
  LoadingContainer,
} from './styles';

import { useApi } from '../../hooks/api';
import { useAuth } from '../../hooks/auth';

import Footer from '../../components/Footer';

import AddItem from './AddItem';
import ListItem from './ListItem';

interface Item {
  id: string;
  title: string;
  date_timestamp: number;
  count_users: number;
  total_value: number;
}

const List: React.FC = () => {
  const { getRequestConfig } = useAuth();
  const { api } = useApi();

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <Container>
      <Header>Agenda de Churras</Header>
      <Content>
        <ListContainer>
          {items.map(item => (
            <ListItem
              key={item.id}
              date={item.date_timestamp}
              title={item.title}
              countUsers={item.count_users}
              totalValue={item.total_value}
            />
          ))}

          <AddItem />
        </ListContainer>

        {isLoading && (
          <LoadingContainer>
            <PulseLoader color="#ffd836" />
          </LoadingContainer>
        )}
      </Content>
      <Footer />
    </Container>
  );
};

export default List;
