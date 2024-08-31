import { FastifyPluginCallback } from 'fastify';
import { handleTTSRequest } from 'services/pdfToAudio/handleTTSRequest';
import { processPDFToAudioRequestForTTS } from 'services/pdfToAudio/processPDFToAudioRequestForTTS';

const routes: FastifyPluginCallback = async (server, _options) => {
  server.post('/pdf-to-audio', async (request, response) => {
    const requestData = await request.file();

    const ttsRequest = await processPDFToAudioRequestForTTS(requestData);
    const responseData = await handleTTSRequest(ttsRequest);

    response.send(responseData);
  });
};

export default routes;
