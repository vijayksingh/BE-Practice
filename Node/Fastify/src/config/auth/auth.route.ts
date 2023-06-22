import { FastifyInstance } from "fastify";
import * as AuthController from './auth.controller';

export async function AuthRoutes(fastify: FastifyInstance) {
  fastify.post("/register", AuthController.register);
  fastify.post("/login", AuthController.login);
  fastify.post("/logout", AuthController.logout);
  fastify.post("/refresh", AuthController.refresh);
}