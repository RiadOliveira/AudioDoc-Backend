import { FastifyPluginCallback } from 'fastify';
import ConvertPDFToAudioService from 'services/ConvertPDFToAudioService';

const routes: FastifyPluginCallback = async (server, _options) => {
  server.post('/pdf-to-audio', async (request, response) => {
    const pdfData = await request.file();
    await ConvertPDFToAudioService.execute(pdfData);
  });
};

export default routes;
