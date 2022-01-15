import React, { useEffect } from 'react';
import { useSession } from '../../../../hooks/useSession';

export default function Account(): JSX.Element {
  const { token, user, readToken } = useSession();

  useEffect(() => {
    readToken();
  }, []);

  return (
    <main>
      <strong>{JSON.stringify(user)}</strong>
      <strong>{JSON.stringify(token)}</strong>
    </main>
  );
}
