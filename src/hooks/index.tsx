import React from 'react';

import { AuthProvider } from './auth';
import { PopupProvider } from './popup';
import { ApiProvider } from './api';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }: Props) => (
  <PopupProvider>
    <AuthProvider>
      <ApiProvider>{children}</ApiProvider>
    </AuthProvider>
  </PopupProvider>
);

export default AppProvider;
