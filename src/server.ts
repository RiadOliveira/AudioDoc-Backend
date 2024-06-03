import fastify from 'fastify';

const server = fastify();

server.get('/', (request, response) => response.send({ hello: 'world' }));

server.listen({ port: 3000 }, (error, address) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }

  console.log(`Server is now listening on ${address}`);
});
