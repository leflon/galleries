import {Component, inject, input} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {matDelete, matEdit} from '@ng-icons/material-icons/baseline';
import {MediaService} from '../../services/media.service';
import {AsyncPipe} from '@angular/common';
import {IMedia} from '../../models/media.model';
import {GalleryService} from '../../services/gallery.service';
import {async} from 'rxjs';

@Component({
  selector: 'app-gallery-card',
  imports: [
    NgIcon,
    ButtonComponent,
    AsyncPipe
  ],
  viewProviders: [provideIcons({matDelete, matEdit})],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.css'
})
export class GalleryCardComponent {

  galleryId = input.required<string>();
  galleryName = input.required<string>();

  media = inject(MediaService);
  gallery = inject(GalleryService);

  thumbnails!: Promise<IMedia[]>;
  itemCount!: Promise<number>;
  protected readonly async = async;

  ngOnInit() {
    this.thumbnails = this.media.getGalleryThumbnails(this.galleryId());
    this.itemCount = this.gallery.getItemCount(this.galleryId());
  }
}
