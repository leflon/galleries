import {Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EMPTY, filter, map, Observable, of, switchMap, take} from 'rxjs';
import {IMedia} from '../../models/media.model';
import {IGallery} from '../../models/gallery.model';
import {GalleryService} from '../../services/gallery.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MediaService} from '../../services/media.service';

@Component({
  selector: 'app-gallery-page',
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css'
})
export class GalleryPageComponent {
  route = inject(ActivatedRoute);
  galleryService = inject(GalleryService);
  mediaService = inject(MediaService);


  gallery$!: Observable<IGallery | null>;
  media$!: Observable<IMedia[]>;
  constructor() {
    this.gallery$ = this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.galleryService.getById(id);
      })
    );
    this.media$ = this.gallery$.pipe(
      switchMap(gallery => gallery ? this.mediaService.getAllFromGallery(gallery.id) : of([]))
    );
  }
}
