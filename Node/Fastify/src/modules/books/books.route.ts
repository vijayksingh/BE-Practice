import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Book, booksData } from "./util";
import { addBook, deleteBook, getBook, updateBook } from "./books.controller";

// Defining a route group for user routes : "/api/users"
export async function booksRoutes(fastify: FastifyInstance) {

  fastify.get("/", {
    handler: async (req, reply) => {
      return reply.code(200).send({books: booksData})
    }
  })

  fastify.get("/:id", {
    handler: async (req: FastifyRequest<{Params: {id: string}}>, reply) => {
      const {id} = req.params;
      const book = getBook(id);
      if (!book) {
        return reply.code(404).send({error: "Book not found"})
      }
      return reply.code(200).send({book})
    }
  })


  fastify.post("/", {
    handler: async (
      request: FastifyRequest<{ Body: Book }>, 
      response: FastifyReply // Response object
    ) => {
      const book = request.body; 
      try {
        addBook(book);
        return response.code(200).send(book);
      } catch(e) {
        return response.code(403).send({error: e.message})
      }
    },
  });


  fastify.put("/:id", {
    handler: async(
      request: FastifyRequest<{Body: Book}>,
      response: FastifyReply
    ) => {
      const book = request.body;
      try {
        updateBook(book);
        return response.code(200).send(book);
      } catch(e) {
        return response.code(403).send({error: e.message})
      }
    }
  })

  fastify.delete("/:id", {
    handler: async(
      req: FastifyRequest<{Params: {id: string}}>,
      response: FastifyReply
    ) => {
      const {id} = req.params;
      try {
        deleteBook(id);
        return response.code(200).send({error: "Book deleted"});
      } catch(e) {
        return response.code(403).send({error: e.message})
      }
    }
  })
    
}