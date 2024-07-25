import { FastifyPluginCallback } from 'fastify';
import ConvertPDFToAudioService from 'services/ConvertPDFToAudioService';

const routes: FastifyPluginCallback = async (server, _options) => {
  server.post('/pdf-to-audio', async (request, response) => {
    const fileData = await request.file();
    const pdfText = await ConvertPDFToAudioService.execute(fileData);

    response.send(pdfText);
  });
};

export default routes;
