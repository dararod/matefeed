import { IResolverObject } from "mercurius";

export const User = {
  async me(source: any, args: any, context: any, info: any) {
    return context.user;
  }
} as IResolverObject;

