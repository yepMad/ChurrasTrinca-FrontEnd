import React, { createContext, useCallback, useState, useContext } from 'react';
import axios from 'axios';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SigInResponse {
  token: string;
  user: ChurrasTrinca.User;
}

interface AuthState {
  token: string;
  user: ChurrasTrinca.User;
}

interface AuthContextData {
  user: ChurrasTrinca.User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const LOCAL_STORAGE_USER = '@ChurrasTrinca:user';
const LOCAL_STORAGE_TOKEN = '@ChurrasTrinca:token';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER);
    const user = localStorage.getItem(LOCAL_STORAGE_TOKEN);

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    const response = await api.post<SigInResponse>('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_USER);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
