import crypto from 'crypto';
import { TTSRequest } from 'types/TTSRequest';
import { TTSResponse } from 'types/TTSResponse';
import { MAX_TEXT_SIZE_FOR_TTS } from 'constants/maxTextSizeForTTS';
import { executeTTSRequest } from './executeTTSRequest';
import { uploadDataToFirebase } from './uploadBlobToFirebase';
import { PDFToAudioRequest } from 'types/PDFToAudioRequest';

export async function handlePDFToAudioRequest({
  fileName,
  pagesText,
  ...baseTTSRequest
}: PDFToAudioRequest): Promise<TTSResponse> {
  const nameWithoutExtension = fileName.split('.')[0];
  const randomHex = crypto.randomBytes(16).toString('hex');
  const audioBaseName = `${nameWithoutExtension}_${randomHex}`;

  const result = getRequestsPromisesAndPagesAudiosQuantity(
    baseTTSRequest,
    pagesText,
    audioBaseName,
  );
  const { requestsPromises, pagesAudiosQuantity } = result;

  await Promise.all(requestsPromises);
  return { audioBaseName, pagesAudiosQuantity };
}

function getRequestsPromisesAndPagesAudiosQuantity(
  baseTTSRequest: Omit<TTSRequest, 'text'>,
  pagesText: string[],
  audioBaseName: string,
) {
  const pagesAudiosQuantity: number[] = [];
  const requestsPromises = pagesText.reduce((prev, text, ind) => {
    const requestData = { ...baseTTSRequest, text };
    const requiredRequests = Math.ceil(text.length / MAX_TEXT_SIZE_FOR_TTS);
    const pageName = `${audioBaseName}_page${ind + 1}`;

    pagesAudiosQuantity.push(requiredRequests);
    const promises = getPagePromises(requestData, requiredRequests, pageName);

    return [...prev, ...promises];
  }, [] as Promise<void>[]);

  return { requestsPromises, pagesAudiosQuantity };
}

function getPagePromises(
  { text, ...request }: TTSRequest,
  requiredRequests: number,
  requestPageName: string,
) {
  const pagePromises: Promise<void>[] = [];

  for (let ind = 0; ind < requiredRequests; ind++) {
    const textStartInd = ind * MAX_TEXT_SIZE_FOR_TTS;
    const textEndInd = textStartInd + MAX_TEXT_SIZE_FOR_TTS;

    const requestText = text.slice(textStartInd, textEndInd);
    const requestFileName = `${requestPageName}_part${ind + 1}.mp3`;
    const ttsRequest: TTSRequest = { ...request, text: requestText };

    const pageRequest = handlePagePromise(ttsRequest, requestFileName);
    pagePromises.push(pageRequest);
  }

  return pagePromises;
}

async function handlePagePromise(ttsRequest: TTSRequest, fileName: string) {
  const audioContent = await executeTTSRequest(ttsRequest);
  await uploadDataToFirebase(fileName, audioContent);
}
