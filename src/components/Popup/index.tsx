import React from 'react';
import { useTransition } from 'react-spring';

import Content from './Content';

interface Props {
  messages: ChurrasTrinca.PopupMessage[];
}

const ModalContainer: React.FC<Props> = ({ messages }: Props) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      config: { duration: 200 },
      from: { opacity: 0, transform: 'scale(1.3)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(1.3)' },
    },
  );

  return (
    <>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Content key={key} style={props} message={item} />
      ))}
    </>
  );
};

export default ModalContainer;
