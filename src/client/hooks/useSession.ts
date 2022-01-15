import { useContext } from 'react';

import { SessionContext } from '../contexts/Session';

import type { SessionContextValue } from '../contexts/Session';

export function useSession(): SessionContextValue {
  const session = useContext(SessionContext);

  return session;
}
