import { GraphQLService } from "./GraphQLService";

import type { Client } from "urql";
import type { User } from "./UserService";

export type Post = {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export class PostService extends GraphQLService {
  constructor(client: Client) {
    super(client);
  }

  public async findAll(token: string): Promise<Post[]> {
    const result = await this.client.query(`
      query {
        posts {
          id
          text
          createdAt
          updatedAt
          author {
            id
            firstName
            lastName
            username
            email
            createdAt
            updatedAt
          }
        }
      }`, null, {
      requestPolicy: 'cache-and-network',
      fetchOptions: {
        headers: {
          'Authorization': `JWT ${token}`,
        }
      }
    }).toPromise();

    if (result.error) {
      throw result.error;
    }

    return result.data.posts;
  }

  public async findByUsername(token: string, username: string): Promise<Post[]> {
    const result = await this.client.query(`
      query ($username: String!) {
        posts(username: $username) {
          id
          text
          createdAt
          updatedAt
          author {
            id
            firstName
            lastName
            username
            email
            createdAt
            updatedAt
          }
        }
      }`, {
      username,
    }, {
      requestPolicy: 'cache-and-network',
      fetchOptions: {
        headers: {
          'Authorization': `JWT ${token}`,
        }
      }
    }).toPromise();

    if (result.error) {
      throw result.error;
    }

    return result.data.posts;
  }
}
