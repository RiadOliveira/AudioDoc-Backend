import routes from 'routes';
import fastify from 'fastify';
import fileHandler from '@fastify/multipart';
import loggerConfig from './config/fastifyLoggerConfig';

const server = fastify(loggerConfig);
server.register(fileHandler);
server.register(routes);

server.listen({ port: 3000 }, (error, _address) => {
  if (!error) return;

  server.log.error(error);
  process.exit(1);
});
