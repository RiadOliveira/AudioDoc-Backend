import { FastifyPluginCallback } from 'fastify';
import { validatePDFToAudioSchema } from 'services/pdfToAudio/validatePDFToAudioSchema';

const routes: FastifyPluginCallback = async (server, _options) => {
  server.post('/pdf-to-audio', async (request, response) => {
    const requestData = await request.file();
    validatePDFToAudioSchema(requestData);

    response.send('pdfText');
  });
};

export default routes;
