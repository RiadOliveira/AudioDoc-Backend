import { FastifyPluginCallback } from 'fastify';
import { handlePDFToAudioRequest } from 'services/pdfToAudio/handlePDFToAudioRequest';
import { parseRequestDataToPDFToAudioRequest } from 'services/pdfToAudio/parseRequestDataToPDFToAudioRequest';

const routes: FastifyPluginCallback = async (server, _options) => {
  server.post('/pdf-to-audio', async (request, response) => {
    const data = await request.file();

    const parsedRequest = await parseRequestDataToPDFToAudioRequest(data);
    const responseData = await handlePDFToAudioRequest(parsedRequest);

    response.send(responseData);
  });
};

export default routes;
