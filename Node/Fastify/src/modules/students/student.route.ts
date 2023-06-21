import { FastifyInstance } from "fastify";
import * as StudentController from "./student.controller";

export async function StudentRoutes(fastify: FastifyInstance) {
  fastify.get("/", StudentController.getAll);
  fastify.get("/:id", StudentController.getOne);
  fastify.post("/", StudentController.create);
  fastify.put("/:id", StudentController.update);
  fastify.delete("/:id", StudentController.deleteOne);
}
