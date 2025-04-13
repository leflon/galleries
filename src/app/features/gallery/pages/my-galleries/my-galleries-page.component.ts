import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {IGallery} from '../../models/gallery.model';
import {GalleryService} from '../../services/gallery.service';
import {GalleryCardComponent} from '../../components/gallery-card/gallery-card.component';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-my-galleries-page',
  imports: [
    AsyncPipe,
    GalleryCardComponent,
    LoadingComponent
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
