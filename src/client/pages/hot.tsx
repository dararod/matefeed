import Layout from '../components/Layout';
import { getServerSidePropsAuthenticated } from '../utils/auth';

export default function Hot(): JSX.Element {
  return (
    <Layout>
      <section>
        <h1>Hot</h1>
      </section>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated();
