import { DomainError } from "../infrastructure/error/DomainError";

import type { GraphQLResolveInfo } from "graphql";
import type { GraphQLResolverContext } from "../@types/global";

export type ResolverFunction = (_parent: unknown, _args: unknown, context: GraphQLResolverContext, _info: GraphQLResolveInfo) => Promise<unknown>;

export const authenticated = (afterAuthResolverFn: ResolverFunction) => async (_parent: unknown, _args: unknown, context: GraphQLResolverContext, _info: GraphQLResolveInfo) => {
  const { user, request } = context;

  if (!user) {
    throw DomainError.fromMessage(`You must be logged in to use this query/mutation. Visit "${request.headers.origin}/login" or "${request.headers.origin}/signup" to create an account, then login and come back to this screen.`);
  }

  return await afterAuthResolverFn(_parent, _args, context, _info);
}
