# Fastify

## What are we doing ? 
- I'll be using this repo to pick up the server side web devlopment stuff in 2023 (Node-Typescript ecosystem). I'll be emphasizing on two parts mostly. 

**Tools and Technologies**  
- Initially i'll be focusing on picking up various toold and technolgies which are most prevailing in the year 2023 in Node.js ecosystem. I'll try to incorporate all the libs which are heavily being used in a production grade Backend Application. 

**Process and Methodologies**
- Once i've covered the tools part i'll start working on refining the process in terms of first setting up a CI/CD pipeline. Putting the server onto a VPN along with some kind of cache and stuff. 

## How to go about it.
The task list below will act like a checkpoint in terms of progress. And i'll try to keep each checkpoint as atomic as possible. And each checkpoint will have a corresponding branch associated with it. 


> The list here is tentative and might change if i find anything interesting

Learning Tools
- [x] Learn to make simple CRUD operations (Without DB)
- [x] Add validation with zod
- [x] Introduce an ORM layer (Prisma / Drizzle) 
- [x] Learn to make simple CRUD with persistance in DB (Postgres)
- [ ] Add authentication with JWT
- [ ] Add unit test and API test ()

Learning Infrastructure
- [ ] Add docker support to your app.
- [ ] Setting up a Server online.
- [ ] Setup a CI / CD pipeline.
- [ ] Add your own DB Instance.
- [ ] Add a Cache 
- [ ] Add support for monitoring and logging. 

Optional Stuff
- [ ] Add support for file upload
- [ ] Add support for file download
- [ ] Add support for sending emails
- [ ] Add support for sending SMS
- [ ] Add support for sending push notifications
- [ ] Add authorization with RBAC



## Technologies 
List of technologies i've added and introduced in this project.

- Server : Fastify
- Database : PostgreSQL (pg) (Database interact) (SQL)
- ORM : ?? DRIZZLE / PRISMA 
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


