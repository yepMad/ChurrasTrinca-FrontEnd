import React from 'react';

import { Container, Panel } from './styles';

interface Props {
  children: React.ReactNode;

  onClickOutside: () => void;
}

const GenericPopup: React.FC<Props> = ({ onClickOutside, children }: Props) => {
  return (
    <Container onClick={onClickOutside}>
      <Panel onClick={e => e.stopPropagation()}>{children}</Panel>
    </Container>
  );
};

export default GenericPopup;
