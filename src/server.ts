import routes from 'routes';
import fastify from 'fastify';
import fileHandler from '@fastify/multipart';
import fileHandlerOptions from 'config/fileHandlerOptions';

const server = fastify();
server.register(fileHandler, fileHandlerOptions);
server.register(routes);

server.listen({ port: 3000 }, (error, _address) => {
  if (!error) return;

  server.log.error(error);
  process.exit(1);
});
