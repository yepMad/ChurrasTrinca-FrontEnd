import React, { HTMLAttributes } from 'react';

import { Container } from './styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  className?: string;
}

const Tooltip: React.FC<Props> = ({ title, className, children }: Props) => (
  <Container className={className}>
    {children}
    <span>{title}</span>
  </Container>
);

export default Tooltip;
// ButtonHTMLAttributes<HTMLButtonElement>
