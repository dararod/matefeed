import { IResolverObject } from "mercurius";

import { authenticated } from "../../utils/graphql";

import type { GraphQLResolverContext } from "../../@types/global";
import type { CreatePostInput } from "../generated";

export const PostMutation = {
  postCreate: authenticated(async (_parent, args: { input?: CreatePostInput; }, context: GraphQLResolverContext) => {
    const user = context.user;
    const services = context.services;
    const post = await services.posts.create({
      authorId: user.id,
      text: args.input.text,
    });

    return post;
  }),
} as IResolverObject;
