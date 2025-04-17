import {onDocumentDeleted} from 'firebase-functions/v2/firestore';
import {getStorage} from 'firebase-admin/storage';

export const deleteStoredMedia = onDocumentDeleted('galleries/{galleryId}/media/{mediaId}', async (event) => {
  const {firebaseFile} = event.data?.data() || {};

  if (firebaseFile) {
    const bucket = getStorage().bucket();
    const file = bucket.file(firebaseFile);

    try {
      await file.delete();
      console.log(`File ${firebaseFile} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete file ${firebaseFile}:`, error);
    }
  } else {
    console.log('No storage associated with this media item.');
  }
});
