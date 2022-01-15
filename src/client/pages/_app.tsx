import type { NextComponentType } from 'next';

import '../styles/global.css';
import { CreatePostContextProvider } from '../contexts/CreatePost';
import { AxiosContextProvider } from '../contexts/Axios';

function App({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: Record<string, unknown>;
}): JSX.Element {
  return (
    <AxiosContextProvider>
      <CreatePostContextProvider>
        <Component {...pageProps} />
      </CreatePostContextProvider>
    </AxiosContextProvider>
  );
}

export default App;
