import { IResolverObject } from "mercurius";

import { authenticated } from "../../utils/graphql";

import type { GraphQLResolverContext } from "../../@types/global";

export const UserQuery = {
  me: authenticated(async (_parent, _args, context: GraphQLResolverContext) => {
    const { services, user } = context;
    const posts = await services.posts.findByAuthorId(user.id);

    return {
      user,
      posts,
    };
  }), 
} as IResolverObject;
