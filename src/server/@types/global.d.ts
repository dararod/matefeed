import type { FastifyRequest } from "fastify";

import type { User } from "../domain/user";
import type { Services } from "../plugins/services";

export {};

declare global {
  type StaticImageData = {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
}

export type GraphQLResolverContext = {
  request: FastifyRequest;
  services: Services;
  user: User;
}
