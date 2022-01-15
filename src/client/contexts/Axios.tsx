import { createContext } from 'react';
import { Axios } from 'axios';

export type AxiosContextValue = {
  axios: Axios;
};

const initialContextValue: AxiosContextValue = {
  axios: null,
};

export const AxiosContext =
  createContext<AxiosContextValue>(initialContextValue);

AxiosContext.displayName = 'AxiosContext';

export function AxiosContextProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const axios = new Axios({
    baseURL: '/',
    timeout: 1000,
    validateStatus: null,
  });

  return (
    <AxiosContext.Provider
      value={{
        axios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}
