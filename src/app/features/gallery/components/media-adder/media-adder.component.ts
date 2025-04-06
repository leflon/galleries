import {Component, inject, Input, output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PopupComponent} from '../../../../shared/components/popup/popup.component';
import {IGallery} from '../../models/gallery.model';
import {MediaService} from '../../services/media.service';

@Component({
  selector: 'app-media-adder',
  imports: [
    NgForOf,
    FormsModule,
    PopupComponent,
    NgIf
  ],
  templateUrl: './media-adder.component.html',
  styleUrl: './media-adder.component.css'
})
export class MediaAdderComponent {

  closed = output<void>();
  mediaService = inject(MediaService);

  @Input({required: true})
  gallery!: IGallery;


  inputtedSources: string[] = [];
  currentSource = '';
  tags = '';

  appendSource() {
    this.inputtedSources.push(this.currentSource);
    this.currentSource = '';
  }

  removeSource(index: number) {
    this.inputtedSources.splice(index, 1);
  }

  async save() {
    const savedTags = this.tags.split(',').map(t => t.trim());
    const media = this.inputtedSources.map(s => {
      return {
        url: s,
        tags: savedTags,
        type: 'image' as 'image',
      };
    });
    this.closed.emit();
    this.mediaService.addBulk(media, this.gallery.id);
  }

}
