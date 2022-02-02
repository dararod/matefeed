import { DomainError } from "../infrastructure/error/DomainError";

import type { GraphQLResolveInfo } from "graphql";
import type { GraphQLResolverContext } from "../@types/global";

export type ResolverFunction<Args> = (_parent: unknown, _args: Args, context: GraphQLResolverContext, _info: GraphQLResolveInfo) => Promise<unknown>;

export const authenticate = (context: GraphQLResolverContext) => {
  const { user, request } = context;

  if (!user) {
    throw DomainError.fromMessage(`You must be logged in to use this query/mutation. Visit "${request.headers.origin}/login" or "${request.headers.origin}/signup" to create an account, then login and come back to this screen.`);
  }
}
