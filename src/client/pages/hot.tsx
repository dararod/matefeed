import { useQuery } from 'urql';

import Layout from '../components/Layout';
import { getServerSidePropsAuthenticated } from '../utils/auth';

export default function Hot(): JSX.Element {
  const MeQuery = `
  query {
    me {
      id
      firstName
      lastName
      email
      username
    }
  }
`;

  const [result] = useQuery({
    query: MeQuery,
  });
  const { data } = result;

  return (
    <Layout>
      <section>
        <h1>Hot</h1>
        {JSON.stringify(data)}
      </section>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated();
