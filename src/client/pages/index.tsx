import Feed from '../components/Feed';
import Layout from '../components/Layout';

import { getServerSidePropsAuthenticated } from '../utils/auth';
import services from '../services';

import type { Post } from '../services/PostService';
import type { User } from '../services/UserService';


export default function Home({ posts }: { posts: Post[]; }): JSX.Element {
  return (
    <Layout>
      <section style={{ paddingTop: '1rem', }}>
        <Feed posts={posts} />
      </section>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsAuthenticated(async (ctx) => {
  const token = ctx.req.cookies.token;
  const posts = await services.postService.findAll(token);

  return {
    props: {
      posts,
    }
  }
});
