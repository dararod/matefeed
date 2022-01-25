import ProfileLayout from '../../../modules/profile/components/ProfileLayout';
import UserAbout from '../../../modules/profile/views/about';
import { getServerSidePropsAuthenticated } from '../../../utils/auth';
import services from '../../../services';

import type { User } from '../../../services/UserService';

export default function AboutPage({ profile }: { profile: User; }): JSX.Element {
  return (
    <ProfileLayout profile={profile}>
      <UserAbout />
    </ProfileLayout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated(async (ctx) => {
  const username = ctx.params.username;
  const token = ctx.req.cookies.token;
  const profile = await services.userService.findByUsername(token, username as string);

  return {
    props: {
      profile,
    }
  }
});
