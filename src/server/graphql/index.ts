import { IResolvers } from 'mercurius';

import { User } from './user/resolver';

export const resolvers: IResolvers = {
  Query: {
    ...User,
  }
}
