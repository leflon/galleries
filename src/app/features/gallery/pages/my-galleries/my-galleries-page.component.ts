import {AsyncPipe, NgForOf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {IGallery} from '../../models/gallery.model';
import {GalleryService} from '../../services/gallery.service';

@Component({
  selector: 'app-my-galleries-page',
  imports: [
    NgForOf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './my-galleries-page.component.html',
  styleUrl: './my-galleries-page.component.css'
})
export class MyGalleriesPageComponent {
  galleryService = inject(GalleryService);
  galleries$: Observable<IGallery[]>;

  constructor() {
    this.galleries$ = this.galleryService.getMyGalleries();
  }
}
