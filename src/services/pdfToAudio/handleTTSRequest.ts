import crypto from 'crypto';
import { isMainThread, Worker, workerData } from 'worker_threads';
import { TTSRequest } from 'types/TTSRequest';
import { TTSResponse } from 'types/TTSResponse';
import { MAX_TEXT_SIZE_FOR_TTS } from 'constants/maxTextSizeForTTS';
import { executeTTSRequest } from './executeTTSRequest';
import { uploadDataToFirebase } from './uploadBlobToFirebase';

if (!isMainThread) handleWorkerJob();

export async function handleTTSRequest(
  request: TTSRequest,
): Promise<TTSResponse> {
  const textLength = request.text.length;
  const requiredRequests = Math.ceil(textLength / MAX_TEXT_SIZE_FOR_TTS);

  const nameWithoutExtension = request.fileName.split('.')[0];
  const randomHex = crypto.randomBytes(16).toString('hex');
  const parsedFileName = `${nameWithoutExtension}_${randomHex}`;

  await sendWorkersRequests(request, requiredRequests, parsedFileName);
  return {
    initialAudioUrl: parsedFileName,
    audioParts: requiredRequests,
  };
}

async function sendWorkersRequests(
  { text, ...request }: TTSRequest,
  requiredRequests: number,
  parsedFileName: string,
) {
  const workersPromises = [];

  for (let ind = 0; ind < requiredRequests; ind++) {
    const textStartInd = ind * MAX_TEXT_SIZE_FOR_TTS;
    const textEndInd = textStartInd + MAX_TEXT_SIZE_FOR_TTS;
    const requestFileName = `${parsedFileName}_part${ind + 1}.mp3`;

    const workerRequest: TTSRequest = {
      ...request,
      fileName: requestFileName,
      text: text.slice(textStartInd, textEndInd),
    };
    workersPromises.push(createWorker(workerRequest));
  }

  await Promise.all(workersPromises);
}

function createWorker(workerData: TTSRequest) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData });
    worker.on('exit', resolve);
    worker.on('error', reject);
  });
}

async function handleWorkerJob() {
  const request = workerData as TTSRequest;

  const audioContent = await executeTTSRequest(request);
  await uploadDataToFirebase(request.fileName, audioContent);
}
