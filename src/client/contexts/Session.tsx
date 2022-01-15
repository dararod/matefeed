import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

export type SessionContextValue = {
  token: string;
  user: object;
  readToken(): void;
};

const initialContextValue: SessionContextValue = {
  token: '',
  user: null,
  readToken: null,
};

export const SessionContext =
  createContext<SessionContextValue>(initialContextValue);

SessionContext.displayName = 'SessionContext';

export function SessionContextProvider({
  children,
  session,
}: {
  children: JSX.Element;
  session?: {
    token: string;
    refreshToken: string;
  };
}): JSX.Element {
  const [token, setToken] = useState(session?.token);
  const [user, setUser] = useState(null);

  const readToken = () => {
    const tokenCookie = Cookies.get('token');
    const userCookie = Cookies.get('user');

    setToken(tokenCookie);
    setUser(userCookie);
  };

  return (
    <SessionContext.Provider
      value={{
        token,
        user,
        readToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
