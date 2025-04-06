import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {map, Observable, of, switchMap} from 'rxjs';
import {IGallery} from '../../models/gallery.model';
import {IMedia} from '../../models/media.model';
import {GalleryService} from '../../services/gallery.service';
import {MediaService} from '../../services/media.service';
import {GalleryViewerComponent} from '../../components/gallery-viewer/gallery-viewer.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {FullscreenMediaComponent} from '../../components/gallery-viewer/fullscreen-media/fullscreen-media.component';

@Component({
  selector: 'app-gallery-page',
  imports: [
    RouterLink,
    GalleryViewerComponent,
    AsyncPipe,
    NgIf,
    FullscreenMediaComponent
  ],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css'
})
export class GalleryPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  galleryService = inject(GalleryService);
  mediaService = inject(MediaService);

  gallery$: Observable<IGallery | null>;
  media$: Observable<IMedia[]>;
  fullscreenMedia$?: Observable<IMedia | null>;

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

    this.router.events.subscribe(e => {
      if (!(e instanceof NavigationEnd))
        return;
      if (this.route.firstChild) {
        const id = this.route.snapshot.firstChild?.params['mediaId'];
        if (!id) this.fullscreenMedia$ = of(null);
        this.fullscreenMedia$ = this.media$.pipe(
          map(media => {
            return media.find(m => m.id === id) || null;
          })
        );
      } else this.fullscreenMedia$ = of(null);
    });
  }
}
