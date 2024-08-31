import { firebaseApp } from 'config/firebaseStorageConfig';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export async function uploadDataToFirebase(
  name: string,
  data: Blob | Uint8Array | ArrayBuffer,
) {
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, `audios/${name}`);

  await uploadBytes(storageRef, data);
}
