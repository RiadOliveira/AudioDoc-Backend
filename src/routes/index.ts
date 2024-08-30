import { FastifyPluginCallback } from 'fastify';
import { executeTTSRequest } from 'services/pdfToAudio/executeTTSRequest';
import { processPDFToAudioRequestForTTS } from 'services/pdfToAudio/processPDFToAudioRequestForTTS';

const routes: FastifyPluginCallback = async (server, _options) => {
  server.post('/pdf-to-audio', async (request, response) => {
    const requestData = await request.file();

    const ttsRequest = await processPDFToAudioRequestForTTS(requestData);
    const audioContent = await executeTTSRequest(ttsRequest);

    response.send(audioContent);
  });
};

export default routes;
