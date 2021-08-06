import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const Button: React.FC<Props> = ({
  isActive = true,
  children,
  ...rest
}: Props) => (
  <Container isActive={isActive} disabled={!isActive} type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
