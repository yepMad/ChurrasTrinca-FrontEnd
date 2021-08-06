import React from 'react';
import { PulseLoader } from 'react-spinners';

import { ButtonContainer, ButtonContent } from './styles';

interface Props {
  isLoading: boolean;
  text: string;
}

const Button: React.FC<Props> = ({ isLoading, text }: Props) => {
  return (
    <ButtonContainer>
      <ButtonContent type="submit" disabled={isLoading}>
        {isLoading ? <PulseLoader color="#FFD836" size={10} /> : text}
      </ButtonContent>
    </ButtonContainer>
  );
};

export default Button;
