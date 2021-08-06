import React, { useState } from 'react';

import { Container, Content, Header, ListContainer } from './styles';

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
  const [items, setItems] = useState<Item[]>([]);

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
      </Content>
      <Footer />
    </Container>
  );
};

export default List;
