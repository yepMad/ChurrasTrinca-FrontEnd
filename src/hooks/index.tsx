import React from 'react';

import { AuthProvider } from './auth';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }: Props) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
