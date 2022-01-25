import { createClient } from "urql";

import { UserService } from "./UserService";
import { PostService } from "./PostService";

import type { Client } from "urql";

export type Services = {
  urqlClient: Client;
  userService: UserService;
  postService: PostService;
}

function initializeServices(): Services {
  const urqlClient = createClient({
    url: 'http://localhost:3000/graphql/'
  });
  const userService = new UserService(urqlClient);
  const postService = new PostService(urqlClient);

  return {
    urqlClient,
    userService,
    postService,
  }
}

export default initializeServices();
