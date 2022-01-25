import { authenticate } from "../utils/graphql";

import type { IResolvers } from "mercurius";
import type { GraphQLResolverContext } from "../@types/global";

export default {
  Query: {
    me: async (_parent, _args, context: GraphQLResolverContext) => {
      authenticate(context);

      return context.user;
    },
    posts: async (_parent, args: { username?: string; }, context: GraphQLResolverContext, _info) => {
      authenticate(context);

      const { services } = context;

      if (args?.username) {
        return services.posts.findByUsername(args.username);
      }

      return services.posts.findAll();
    },
    users: async (_parent, args: { username?: string; }, context: GraphQLResolverContext) => {
      authenticate(context);
      const { services } = context;

      if (args?.username) {
        return await services.users.findByUsername(args.username);
      }

      const users = await services.users.findAll();

      return users;
    },
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
