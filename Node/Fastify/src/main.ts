// Importing Fastify and its types
import Fastify from "fastify";
import { booksRoutes } from "./modules/books/books.route";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db";

// Creating a Fastify instance with a logger that uses the "pino-pretty" transport
const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});


// Registering the booksRoutes function with a prefix of "/api/users"
fastify.register(booksRoutes, { prefix: "/api/books" });

// Defining the main function that starts the server
async function main() {
  await fastify.listen({
    port: 3000, // Listening on port 3000
    host: "0.0.0.0", // Listening on all available network interfaces
  });

  await migrate(db , {
    migrationsFolder: "./migrations",
  });
}


// Defining an array of events to listen for
const events = ["SIGINT", "SIGTERM"];
events.forEach((event) => {
  // Listening for each event and closing the server when it occurs
  process.on(event, async () => {
    await fastify.close(); // Closing the Fastify instance

    process.exit(0); // Exiting the process with a status code of 0
  });
});

// Calling the main function to start the server
main();
