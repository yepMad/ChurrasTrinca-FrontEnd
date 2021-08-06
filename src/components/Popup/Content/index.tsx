import React, { useMemo } from 'react';
import { AnimatedValue, ForwardedProps } from 'react-spring';

import {
  Container,
  Panel,
  CharContainer,
  TextContainer,
  Text,
  ButtonContainer,
  Button,
} from './styles';

import CharHappy from '../../../assets/char_happy.svg';
import CharInfo from '../../../assets/char_info.svg';
import CharSad from '../../../assets/char_sad.svg';

import { usePopup } from '../../../hooks/popup';

interface Props {
  message: ChurrasTrinca.PopupMessage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: AnimatedValue<ForwardedProps<any>>;
}

const Popup: React.FC<Props> = ({ message, style }: Props) => {
  const { removePopup } = usePopup();

  const char = useMemo(() => {
    if (message.type === 'success') {
      return <img src={CharHappy} alt="Ícone de personagem sorrindo" />;
    }

    if (message.type === 'error') {
      return <img src={CharSad} alt="Ícone de personagem triste" />;
    }

    return <img src={CharInfo} alt="Ícone de personagem" />;
  }, [message]);

  return (
    <Container onClick={() => removePopup(message.id)} style={style}>
      <Panel>
        <CharContainer>{char}</CharContainer>
        <TextContainer>
          <Text>{message.description}</Text>
        </TextContainer>
        <ButtonContainer>
          <Button onClick={() => removePopup(message.id)}>ok</Button>
        </ButtonContainer>
      </Panel>
    </Container>
  );
};

export default Popup;
