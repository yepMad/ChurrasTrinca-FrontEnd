import React from 'react';

import { Container, Panel } from './styles';

interface Props {
  children: React.ReactNode;
  isLoading: boolean;

  onClickOutside: () => void;
}

const GenericPopup: React.FC<Props> = ({
  onClickOutside,
  isLoading,
  children,
}: Props) => {
  return (
    <Container onClick={isLoading ? () => null : () => onClickOutside()}>
      <Panel onClick={e => e.stopPropagation()}>{children}</Panel>
    </Container>
  );
};

export default GenericPopup;
