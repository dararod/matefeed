import { IResolvers } from 'mercurius';

import { PostMutation } from './post/resolver';
import { UserQuery } from './user/resolver';

export const resolvers: IResolvers = {
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...PostMutation,
  }
}

export const loaders = {
  Me: {
    user: {
      async loader(queries) {
        return queries.map(({ obj }) => {
          return obj.user;
        });
      }
    },
  },
  Post: {
    author: {
      async loader(queries) {
        return queries.map(({ obj }) => {
          return obj.author;
        });
      }
    }
  }
}
