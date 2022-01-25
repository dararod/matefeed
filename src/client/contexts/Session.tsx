import Cookies from 'js-cookie';
import { createContext, useState } from 'react';

import services from '../services';

import type { User } from '../services/UserService';

export type SessionContextValue = {
  token: string;
  currentUser: User | null;
  me(): void;
};

const initialContextValue: SessionContextValue = {
  token: null,
  currentUser: null,
  me: null,
};

export const SessionContext =
  createContext<SessionContextValue>(initialContextValue);

SessionContext.displayName = 'SessionContext';

export function SessionContextProvider({
  children,
  user,
  session,
}: {
  children: JSX.Element;
  user: User | null;
  session?: {
    token: string;
    refreshToken: string;
  };
}): JSX.Element {
  const [token, setToken] = useState<string | null>(session?.token || null);
  const [currentUser, setCurrentUser] = useState<User |  null>(user);

  const me = async (): Promise<void> => {
    const tokenCookie = Cookies.get('token');
    const user = await services.userService.me(tokenCookie);

    setToken(tokenCookie);
    setCurrentUser(user);
  }

  return (
    <SessionContext.Provider
      value={{
        token,
        currentUser,
        me,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
