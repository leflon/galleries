import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {combineLatest, filter, map, Observable, of, startWith, switchMap} from 'rxjs';
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

  gallery$: Observable<IGallery | null> = this.route.params.pipe(
    switchMap(params => {
      const id = params['id'];
      return this.galleryService.getById(id);
    })
  );
  media$: Observable<IMedia[]> = this.gallery$.pipe(
    switchMap(gallery => gallery ? this.mediaService.getAllFromGallery(gallery.id) : of([]))
  );

  fullscreen$!: Observable<{
    current: IMedia | null;
    previous: string | null;
    next: string | null;
  }>;

  ngOnInit() {
    this.fullscreen$ = this.router.events.pipe(
      // Runs only once after each navigation ends
      filter(event => event instanceof NavigationEnd),
      // To run it on first load as well
      startWith(null),
      switchMap((_e) => {
        if (!this.route.firstChild) // -> URL doesn't include /:mediaId Part
          return of({current: null, previous: null, next: null});
        // Change fullscreen data on url change or media data change
        return combineLatest([this.route.firstChild.params, this.media$]).pipe(
          map(([params, mediaList]) => {
            const mediaId = params['mediaId'];
            const current = mediaList.find(m => m.id === mediaId);
            if (!current)
              return {current: null, next: null, previous: null};

            const previous = mediaList.find(m => m.index === current.index - 1);
            const next = mediaList.find(m => m.index === current.index + 1);
            return {
              current,
              next: next?.id ?? null,
              previous: previous?.id ?? null
            }
          }));
      }),
    );
  }

}
