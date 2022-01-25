import type { Client } from 'urql';

export class GraphQLService  {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
