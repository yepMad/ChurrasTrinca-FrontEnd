import React, { useCallback, createContext, useContext } from 'react';
import axios, { AxiosInstance, AxiosError } from 'axios';

import { useAuth } from './auth';
import { usePopup } from './popup';

interface ErrorHandlerProps {
  error: AxiosError<ChurrasTrinca.ApiError>;
  showErrorPopup?: boolean;
}

interface ApiProps {
  showErrorPopup?: boolean;
}

interface ApiContextData {
  api: (props?: ApiProps) => AxiosInstance;
}

interface Props {
  children: React.ReactNode;
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider: React.FC<Props> = ({ children }: Props) => {
  const { addPopup } = usePopup();
  const { signOut } = useAuth();

  const errorHandler = useCallback(
    (data: ErrorHandlerProps): Promise<never> => {
      const { error, showErrorPopup } = data;

      if (!showErrorPopup) {
        return Promise.reject(error);
      }

      if (error.response) {
        const { response } = error;

        if (response.status === 401) {
          addPopup({
            type: 'info',
            description:
              'Por favor, sua sessão expirou, entre novamente em sua conta.',
          });

          signOut();
          return Promise.reject(error);
        }

        if (response.status === 403) {
          addPopup({
            type: 'error',
            description: 'Você não tem permissão para fazer isto.',
          });

          return Promise.reject(error);
        }

        if (response.data) {
          if (response.data.message) {
            const { message } = response.data;

            addPopup({
              type: 'error',
              description: message,
            });

            return Promise.reject(error);
          }
        }
      }

      addPopup({
        type: 'error',
        description: 'Algo inesperado aconteceu, aguarde alguns minutos!',
      });

      return Promise.reject(error);
    },
    [addPopup, signOut],
  );

  const api = useCallback(
    (data?: ApiProps): AxiosInstance => {
      const axiosApi = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}`,
        timeoutErrorMessage:
          'Algo inesperado aconteceu, aguarde alguns minutos!',
      });

      axiosApi.interceptors.response.use(
        response => response,
        error =>
          errorHandler({ error, showErrorPopup: data?.showErrorPopup || true }),
      );

      return axiosApi;
    },
    [errorHandler],
  );

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};

export function useApi(): ApiContextData {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }

  return context;
}
