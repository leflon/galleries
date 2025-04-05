import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, query, where } from '@angular/fire/firestore';
import { catchError, filter, Observable, of, switchMap } from 'rxjs';
import { IGallery } from '../models/gallery.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  firestore = inject(Firestore);
  authService = inject(AuthService);

  getMyGalleries() {
    return this.authService.user$.pipe(
      filter(user => !!user),
      switchMap(user => {
        const col = collection(this.firestore, 'galleries');
        const q = query(col, where('ownerId', '==', user.uid));
        return collectionData(q, { idField: 'id' }) as Observable<IGallery[]>;
      })
    )
  }

  getById(id: string): Observable<IGallery | null> {
    return this.authService.user$.pipe(
      switchMap(user => {
        const galleryDoc = doc(this.firestore, `galleries/${id}`);
        return docData(galleryDoc, { idField: 'id' }) as Observable<IGallery>;
      }),
      catchError(err => of(null))
    );
  }
}
