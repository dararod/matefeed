import type { ParsedUrlQuery } from 'querystring';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';

export type ApplicationCookies = { token?: string; refreshToken?: string };

export type GetServerSidePropsAuthenticated = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> & {
    session: ApplicationCookies;
  },
) => Promise<GetServerSidePropsResult<unknown>>;

export const getServerSidePropsAuthenticated =
  (getServerSideProps?: GetServerSidePropsAuthenticated) =>
  async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> & {
      session: ApplicationCookies;
    },
  ): Promise<GetServerSidePropsResult<unknown>> => {
    const cookies = (context.req as unknown as Record<string, unknown>)
      .cookies as ApplicationCookies;

    if (cookies?.token && cookies?.refreshToken) {
      const session = {
        token: cookies.token,
        refreshToken: cookies.refreshToken,
      };

      if (getServerSideProps) {
        return getServerSideProps({
          ...context,
          session,
        });
      }

      return {
        props: {
          session,
        },
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  };
