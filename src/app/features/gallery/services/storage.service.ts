import {inject, Injectable} from '@angular/core';
import {deleteObject, getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {Firestore} from '@angular/fire/firestore';
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = inject(Storage);
  firestore = inject(Firestore);

  bulkUpload(galleryId: string, files: File[]) {
    const uploads = files.map(async (file) => {
      const id = v4();
      const imgRef = ref(this.storage, `${galleryId}/${id}`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      return {
        id: `${galleryId}/${id}`,
        url
      };
    });
    return Promise.all(uploads);
  }

  deleteFile(path: string) {
    const imgRef = ref(this.storage, path);
    return deleteObject(imgRef);
  }
}
