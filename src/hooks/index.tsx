import React from 'react';

import { AuthProvider } from './auth';
import { PopupProvider } from './popup';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }: Props) => (
  <PopupProvider>
    <AuthProvider>{children}</AuthProvider>
  </PopupProvider>
);

export default AppProvider;
