import Layout from '../components/Layout';
import { getServerSidePropsAuthenticated } from '../utils/auth';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <section>
        <h1>Feed</h1>
      </section>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated();
