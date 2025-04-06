import {Component, inject, Input} from '@angular/core';
import {IMedia} from '../../../models/media.model';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-media-item',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.css'
})
export class MediaItemComponent {
  activatedRoute = inject(ActivatedRoute);
  @Input()
  data!: IMedia;
}
