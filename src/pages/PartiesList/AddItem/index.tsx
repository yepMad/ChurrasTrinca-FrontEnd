import React from 'react';

import { Container, Content, Circle, Text } from './styles';
import { ReactComponent as IconGrill } from '../../../assets/icon_grill.svg';

interface Props {
  onClick: () => void;
}

function AddItem({ onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <Content>
        <Circle>
          <IconGrill />
        </Circle>
        <Text>Adicionar Churras</Text>
      </Content>
    </Container>
  );
}

export default React.memo(AddItem);
