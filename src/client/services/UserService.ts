import { GraphQLService } from "./GraphQLService";

import type { Client } from "urql";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UserService extends GraphQLService {
  constructor(client: Client) {
    super(client);
  }

  public async me(token: string): Promise<User> {
    const result = await this.client.query(`{
      me {
        id
        firstName
        lastName
        email
        username
        birthdate
        createdAt
        updatedAt
      }
    }`, null, {
      fetchOptions: {
        headers: {
          'Authorization': `JWT ${token}`,
        }
      }
    }).toPromise();

    if (result.error) {
      throw result.error;
    }

    return result.data.me;
  }

  public async findByUsername(token: string, username: string): Promise<User | null> {
    // TODO: Define some user fragment to achieve DRY
    const result = await this.client.query(`
      query ($username: String!) {
      users(username: $username) {
        id
        firstName
        lastName
        email
        username
        birthdate
        createdAt
        updatedAt
      }
    }`, {
      username,
    }, {
      fetchOptions: {
        headers: {
          'Authorization': `JWT ${token}`,
        }
      }
    }).toPromise();

    if (result.error) {
      throw result.error;
    }

    const users = result.data.users;

    if (users.length) {
      return users[0];
    }

    return null;
  }
}
