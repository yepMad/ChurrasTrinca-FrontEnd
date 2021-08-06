import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import Popup from '../components/Popup';

interface PopupContextData {
  addPopup(message: Omit<ChurrasTrinca.PopupMessage, 'id'>): void;
  removePopup(id: string): void;
}

const PopupContext = createContext<PopupContextData>({} as PopupContextData);

interface Props {
  children: React.ReactNode;
}

export const PopupProvider: React.FC<Props> = ({ children }: Props) => {
  const [messages, setMessages] = useState<ChurrasTrinca.PopupMessage[]>([]);

  const addPopup = useCallback(
    ({ type, description }: Omit<ChurrasTrinca.PopupMessage, 'id'>) => {
      const id = v4();

      const popup = {
        id,
        type,
        description,
      };

      setMessages(state => [...state, popup]);
    },
    [],
  );

  const removePopup = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <PopupContext.Provider value={{ addPopup, removePopup }}>
      {children}
      <Popup messages={messages} />
    </PopupContext.Provider>
  );
};

export function usePopup(): PopupContextData {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }

  return context;
}
