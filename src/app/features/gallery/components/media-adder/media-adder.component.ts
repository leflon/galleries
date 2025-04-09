import {Component, inject, Input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PopupComponent} from '../../../../shared/components/popup/popup.component';
import {IGallery} from '../../models/gallery.model';
import {MediaService} from '../../services/media.service';
import {provideIcons} from '@ng-icons/core';
import {matDelete} from '@ng-icons/material-icons/baseline';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {IMediaAdderItem} from '../../models/mediaAdderItem.model';
import {MediaDrawerComponent} from './media-drawer/media-drawer.component';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {MediaTagComponent} from '../../../../shared/components/media-tag/media-tag.component';

@Component({
  selector: 'app-media-adder',
  imports: [
    FormsModule,
    PopupComponent,
    ButtonComponent,
    MediaDrawerComponent,
    LoadingComponent,
    MediaTagComponent,
  ],
  viewProviders: [provideIcons({matDelete})],
  templateUrl: './media-adder.component.html',
  styleUrl: './media-adder.component.css'
})
export class MediaAdderComponent {

  closed = output<void>();
  mediaService = inject(MediaService);

  @Input({required: true})
  gallery!: IGallery;


  items = signal<IMediaAdderItem[]>([]);
  tags = signal<string[]>([]);
  isUploading = signal(false);

  currentSource = '';
  tagInput = '';

  tagKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ',') {
      const t = this.tagInput.trim();
      if (t) {
        this.tags.set([...this.tags(), t]);
        setTimeout(() => this.tagInput = '', 1);
      }
    }
    if (event.key === 'Backspace' && this.tagInput === '') {
      this.tags().pop();
      this.tags.set(this.tags());
    }
  }

  removeTag(index: number) {
    this.tags().splice(index, 1);
    this.tags.set(this.tags());
  }


  async save() {
    const savedTags = this.tags();
    this.isUploading.set(true);
    await this.mediaService.handleMediaAdder(this.items(), savedTags, this.gallery.id);
    this.isUploading.set(false);
    this.closed.emit();
  }

}
