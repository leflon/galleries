import {onCall} from 'firebase-functions/v2/https';
import {getFirestore} from 'firebase-admin/firestore';
import {error, log} from 'firebase-functions/logger';


export const deleteGallery = onCall({timeoutSeconds: 540, memory: '2GiB'}, async (request) => {
  const galleryId = request.data.galleryId;

  if (!request.auth) {
    return error('Must be authenticated');
  }

  const db = getFirestore();

  const galleryRef = db.collection('galleries').doc(galleryId);
  const galleryDoc = await galleryRef.get();

  if (!galleryDoc.exists) {
    return error('The gallery does not exist.');
  }

  const galleryData = galleryDoc.data();
  if (galleryData?.ownerId !== request.auth.uid) {
    return error('Must be the owner of the gallery to delete it.');
  }

  const mediaCollectionRef = galleryRef.collection('media');
  const mediaSnapshot = await mediaCollectionRef.get();

  const batchSize = 500; // Firestore's limitation for a single batch.
  const batches = [];
  let batch = db.batch();
  let operationCount = 0;

  mediaSnapshot.forEach(doc => {
    batch.delete(doc.ref);
    operationCount++;

    if (operationCount >= batchSize) {
      batches.push(batch.commit());
      batch = db.batch();
      operationCount = 0;
    }
  });

  if (operationCount > 0) {
    batches.push(batch.commit());
  }
  try {
    await Promise.all([...batches, galleryRef.delete()]);
    log(`Deleted all ${mediaSnapshot.size} media items and the gallery ${galleryId}, using ${batches.length} batch${batches.length === 1 ? '' : 'es'}.`);
    return {success: true, message: 'Gallery successfully deleted.'};
  } catch (err) {
    error(`Error deleting gallery ${galleryId}:`, err);
    return {success: false, message: 'Error deleting gallery.'};
  }
});
