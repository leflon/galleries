import {CanMatchFn} from '@angular/router';
import {inject} from '@angular/core';
import {GalleryService} from '../services/gallery.service';
import {catchError, map, of, take} from 'rxjs';

export const galleryAccessGuard: CanMatchFn = (_route, segments) => {
  const id = segments[1].path;
  const galleryService = inject(GalleryService);
  return galleryService.getById(id).pipe(
    take(1),
    map(g => !!g),
    catchError(_error => of(false))
  )
};
