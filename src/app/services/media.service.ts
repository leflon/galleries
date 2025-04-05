import {inject, Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {IMedia} from '../models/media.model';

@Injectable({ providedIn: 'root' })
export class MediaService {
  firestore = inject(Firestore);

  getAllFromGallery(galleryId: string): Observable<IMedia[]> {
    const mediaRef = collection(this.firestore, `galleries/${galleryId}/media`);
    return collectionData(mediaRef, { idField: 'id' }) as Observable<IMedia[]>;
  }
}
