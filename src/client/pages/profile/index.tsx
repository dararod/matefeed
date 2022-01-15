import Layout from '../../components/Layout';
import Profile from '../../modules/profile/views/me';
import { getServerSidePropsAuthenticated } from '../../utils/auth';

export default function ProfilePage(): JSX.Element {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated();
