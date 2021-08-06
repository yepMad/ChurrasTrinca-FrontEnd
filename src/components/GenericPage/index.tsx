import React from 'react';

import { Container, Content, Header } from './styles';

import Footer from '../Footer';

interface Props {
  title: string;
  children: React.ReactNode;
}

const GenericPage: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <Container>
      <Header>{title}</Header>
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default GenericPage;
