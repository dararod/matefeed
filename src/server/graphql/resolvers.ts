import { authenticate } from "../utils/graphql";

import type { IResolvers } from "mercurius";
import type { GraphQLResolverContext } from "../@types/global";

export default {
  Query: {
    me: async (_parent, _args, context: GraphQLResolverContext) => {
      authenticate(context);

      const { services, user } = context;
      const posts = await services.posts.findByAuthorId(user.id);

      return {
        user,
        posts,
      };
    }
  },
  Mutation: {
    postCreate: async (_parent, args, context: GraphQLResolverContext) => {
      authenticate(context);

      const user = context.user;
      const services = context.services;
      const post = await services.posts.create({
        authorId: user.id,
        text: args.input.text,
      });

      return post;
    }
  }
} as IResolvers;
