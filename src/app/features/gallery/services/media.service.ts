import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getCountFromServer,
  writeBatch
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import {IMedia} from '../models/media.model';

@Injectable({providedIn: 'root'})
export class MediaService {
  firestore = inject(Firestore);

  getAllFromGallery(galleryId: string): Observable<IMedia[]> {
    const mediaRef = collection(this.firestore, `galleries/${galleryId}/media`);
    return collectionData(mediaRef, {idField: 'id'}).pipe(
      map(
        (data) =>
          data.sort((a, b) => (<IMedia>a).index - (<IMedia>b).index)
      )
    ) as Observable<IMedia[]>;
  }

  async addBulk(media: Omit<Omit<IMedia, 'index'>, 'id'>[], galleryId: string) {
    const size = (await getCountFromServer(collection(this.firestore, `galleries/${galleryId}/media`))).data().count;
    const col = collection(this.firestore, `galleries/${galleryId}/media`);
    const batch = writeBatch(this.firestore);

    for (let i = 0; i < media.length; i++) {
      const m = media[i];
      const ref = doc(col);
      batch.set(ref, {...m, index: size + i});
    }
    return batch.commit();
  }

  delete(galleryId: string, mediaId: string) {
    const mediaRef = doc(this.firestore, `galleries/${galleryId}/media/${mediaId}`);
    return deleteDoc(mediaRef);
  }

}
