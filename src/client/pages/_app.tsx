import { Provider as UrqlProvider, createClient } from 'urql';

import { CreatePostContextProvider } from '../contexts/CreatePost';
import { AxiosContextProvider } from '../contexts/Axios';
import { SessionContextProvider } from '../contexts/Session';

import type { ReactNode } from 'react';
import type { AppContext } from 'next/app';
import type { NextComponentType } from 'next';

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
  } & { [key: string]: unknown; children: ReactNode };
}): JSX.Element {
  const client = createClient({
    url: 'http://localhost:3000/graphql/'
  });

  return (
    <UrqlProvider value={client}>
      <SessionContextProvider session={pageProps.session}>
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

  return {
    pageProps: {
      session,
    },
  };
};

export default App;
