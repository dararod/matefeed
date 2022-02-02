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
