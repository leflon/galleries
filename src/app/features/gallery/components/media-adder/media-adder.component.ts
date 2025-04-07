import {Component, inject, Input, output, signal} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PopupComponent} from '../../../../shared/components/popup/popup.component';
import {IGallery} from '../../models/gallery.model';
import {MediaService} from '../../services/media.service';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matDelete} from '@ng-icons/material-icons/baseline';
import {ButtonComponent} from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-media-adder',
  imports: [
    NgForOf,
    FormsModule,
    PopupComponent,
    NgIcon,
    ButtonComponent
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


  inputtedSources = signal<string[]>([]);
  tags = signal<string[]>([]);
  currentSource = '';
  tagInput = '';

  sourceKeyDown($event: KeyboardEvent) {
    if ($event.key === 'Enter')
      this.appendSource();
  }

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

  appendSource() {
    const src = this.currentSource.trim();
    if (!src || !URL.canParse(src)) return;
    this.inputtedSources.set([...this.inputtedSources(), src]);
    this.currentSource = '';
  }

  removeSource(index: number) {
    const newArray = this.inputtedSources().filter((_v, i) => i !== index);
    this.inputtedSources.set(newArray);
  }

  async save() {
    const savedTags = this.tags();
    const media = this.inputtedSources().map(s => {
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
