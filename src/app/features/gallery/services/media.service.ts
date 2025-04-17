import {inject, Injectable} from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDocs,
  limit,
  query,
  where,
  writeBatch
} from '@angular/fire/firestore';
import {firstValueFrom, map, Observable} from 'rxjs';
import {IMedia} from '../models/media.model';
import {IMediaAdderItem} from '../models/mediaAdderItem.model';
import {StorageService} from './storage.service';

@Injectable({providedIn: 'root'})
export class MediaService {
  firestore = inject(Firestore);
  storage = inject(StorageService);

  async getGalleryThumbnails(galleryId: string): Promise<IMedia[]> {
    const col = collection(this.firestore, `galleries/${galleryId}/media`);
    const q = query(col, where('type', '==', 'image'), limit(4));
    return firstValueFrom(collectionData(q, {idField: 'id'}) as Observable<IMedia[]>);
  }

  getAllFromGallery(galleryId: string): Observable<IMedia[]> {
    const mediaRef = collection(this.firestore, `galleries/${galleryId}/media`);
    const col = collectionData(mediaRef, {idField: 'id'}) as Observable<IMedia[]>;
    return col.pipe(
      map(media => this.sortGalleryMedia(media))
    );
  }

  async handleMediaAdder(items: IMediaAdderItem[], tags: string[], galleryId: string) {
    const files = items.filter(m => m.type === 'file').map(m => m.file!);
    const uploaded = await this.storage.bulkUpload(galleryId, files);
    const media: Omit<Omit<IMedia, 'index'>, 'id'>[] = [];
    let i = 0;
    for (const entry of items) {
      if (entry.type === 'url') {
        media.push({
          tags,
          type: 'image' as 'image',
          previous: null,
          next: null,
          url: entry.url!,
          firebaseFile: null,
        });
      } else {
        media.push({
          tags,
          type: 'image' as 'image',
          previous: null,
          next: null,
          url: uploaded[i].url,
          firebaseFile: uploaded[i].id,
        });
      }
      i++;
    }
    return this.addBulk(media, galleryId);
  }

  async addBulk(media: Omit<Omit<IMedia, 'index'>, 'id'>[], galleryId: string) {
    const col = collection(this.firestore, `galleries/${galleryId}/media`);

    const queryTail = query(col, where('next', '==', null), limit(1));
    const data = await getDocs(queryTail);
    const tailId = data.docs[0]?.id || null;


    const batch = writeBatch(this.firestore);

    // We need all the IDs beforehand
    const refs = media.map(_ => doc(col));

    if (tailId) {
      const tailRef = doc(this.firestore, `galleries/${galleryId}/media/${tailId}`);
      batch.update(tailRef, {next: refs[0].id});
    }


    for (let i = 0; i < media.length; i++) {
      const m = media[i];
      const entry = {
        ...m,
        previous: i === 0 ? tailId : refs[i - 1].id,
        next: i === media.length - 1 ? null : refs[i + 1].id,
      }
      batch.set(refs[i], entry);
    }
    return batch.commit();
  }

  async delete(galleryId: string, mediaId: string) {
    const batch = writeBatch(this.firestore);

    const deleteRef = doc(this.firestore, `galleries/${galleryId}/media/${mediaId}`);
    const deleteData = await firstValueFrom(docData(deleteRef, {idField: 'id'}) as Observable<IMedia>);
    if (!deleteData) return;
    batch.delete(deleteRef);

    if (deleteData.previous) {
      const previousRef = doc(this.firestore, `galleries/${galleryId}/media/${deleteData.previous}`);
      batch.update(previousRef, {next: deleteData.next});
    }

    if (deleteData.next) {
      const nextRef = doc(this.firestore, `galleries/${galleryId}/media/${deleteData.next}`);
      batch.update(nextRef, {previous: deleteData.previous});
    }
    return batch.commit();
  }

  private sortGalleryMedia(array: IMedia[]): IMedia[] {
    const head = array.find(m => m.previous === null);
    if (!head)
      return array;
    const sorted: IMedia[] = [];
    let current: IMedia | null = head;
    while (current) {
      sorted.push(current);
      current = array.find(m => m.id === current!.next) || null;
    }
    return sorted;
  }


}
