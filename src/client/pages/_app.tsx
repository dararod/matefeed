import { Provider as UrqlProvider } from 'urql';

import services from '../services';
import { CreatePostContextProvider } from '../contexts/CreatePost';
import { AxiosContextProvider } from '../contexts/Axios';
import { SessionContextProvider } from '../contexts/Session';

import type { ReactNode } from 'react';
import type { AppContext } from 'next/app';
import type { NextComponentType } from 'next';
import type { User } from '../services/UserService';

import '../styles/global.css';

function App({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: {
    session: {
      token: string;
      refreshToken: string;
    };
    user: User | null;
  } & { [key: string]: unknown; children: ReactNode };
}): JSX.Element {
  return (
    <UrqlProvider value={services.urqlClient}>
      <SessionContextProvider session={pageProps.session} user={pageProps.user}>
        <AxiosContextProvider>
          <CreatePostContextProvider>
            <Component {...pageProps} />
          </CreatePostContextProvider>
        </AxiosContextProvider>
      </SessionContextProvider>
    </UrqlProvider>
  );
}

/**
 * There's some caveats on this approach, read more on:
 *
 * https://nextjs.org/docs/advanced-features/custom-app#caveats
 */
App.getInitialProps = async (context: AppContext) => {
  const cookies = (
    context.ctx.req as unknown as {
      cookies: { token: string; refreshToken: string };
    }
  )?.cookies;

  const session = {
    token: cookies?.token,
    refreshToken: cookies?.refreshToken,
  };
  const user = session.token ? await services.userService.me(session.token) : null;

  return {
    pageProps: {
      session,
      user,
    },
  };
};

export default App;
