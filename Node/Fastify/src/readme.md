# Fastify

## What are we doing ? 

## Technologies 

- Server : Fastify
- Database : PostgreSQL (pg) (Database interact) (SQL)
- ORM : ?? (Object Relational Mapping) (Wont use) 
- fastify-postgres (Database interact) (SQL)


## Code Basics (CRUD)

- Initialise a server with `fastify.listen`

```js
async function main() {
  await fastify.listen({
    port: 3000,
    host: "0.0.0.0",
  });
}
```

- Define a logger with `pino-pretty`

```js
const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});
```

- Add a graceful shutdown with `process.on('SIGINT', () => {})`

```js
const events = ["SIGINT", "SIGTERM"];
events.forEach((event) => {
  process.on(event, async () => {
    await fastify.close();

    process.exit(0);
  });
});
```
