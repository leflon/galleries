import {Component, inject, input} from '@angular/core';
import {IMedia} from '../../../models/media.model';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonComponent} from '../../../../../shared/components/button/button.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matDelete, matOpenInNew} from '@ng-icons/material-icons/baseline';
import {MediaService} from '../../../services/media.service';

@Component({
  selector: 'app-media-item',
  imports: [
    RouterLink,
    ButtonComponent,
    NgIcon
  ],
  providers: [provideIcons({matDelete, matOpenInNew})],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.css'
})
export class MediaItemComponent {
  activatedRoute = inject(ActivatedRoute);
  mediaService = inject(MediaService);

  data = input.required<IMedia>();
  galleryId = input.required<string>();

  protected readonly window = window;

  delete() {
    //TODO: Make a real modal
    if (confirm('Are you sure?')) {
      this.mediaService.delete(this.galleryId(), this.data().id);
    }
  }
}
