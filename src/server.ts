import routes from 'routes';
import fastify from 'fastify';
import cors from '@fastify/cors';
import fileHandler from '@fastify/multipart';
import fileHandlerOptions from 'config/fileHandlerOptions';
import loggerConfig from 'config/fastifyLoggerConfig';

const server = fastify(loggerConfig);

server.register(fileHandler, fileHandlerOptions);
server.register(routes);
server.register(cors, { origin: '*', methods: ['POST'] });

server.listen({ port: 3000 }, (error, _address) => {
  if (!error) return;

  server.log.error(error);
  process.exit(1);
});
