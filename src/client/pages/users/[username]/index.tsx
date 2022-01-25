import ProfileLayout from '../../../modules/profile/components/ProfileLayout';
import UserFeed from '../../../modules/profile/views/feed';

import { getServerSidePropsAuthenticated } from '../../../utils/auth';
import services from '../../../services';

import type { Post } from '../../../services/PostService';
import type { User } from '../../../services/UserService';

export default function UserFeedPage({ profile, posts }: { profile: User; posts: Post[]; }): JSX.Element {
  return (
    <ProfileLayout profile={profile}>
      <UserFeed posts={posts} />
    </ProfileLayout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated(async (ctx) => {
  const username = ctx.params.username;
  const token = ctx.req.cookies.token;
  const profile = await services.userService.findByUsername(token, username as string);
  const posts = await services.postService.findByUsername(token, username as string);

  return {
    props: {
      profile,
      posts,
    }
  }
});
