import {Component, Input} from '@angular/core';
import {IMedia} from '../../models/media.model';
import {NgForOf, NgIf} from '@angular/common';
import {MediaItemComponent} from './media-item/media-item.component';

@Component({
  selector: 'app-gallery-viewer',
  imports: [
    NgIf,
    MediaItemComponent,
    NgForOf
  ],
  templateUrl: './gallery-viewer.component.html',
  styleUrl: './gallery-viewer.component.css'
})
export class GalleryViewerComponent {

  @Input() media: IMedia[] = [];

}
