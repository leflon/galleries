import {Component, model} from '@angular/core';
import {IMediaAdderItem} from '../../../models/mediaAdderItem.model';
import {MediaDrawerItemComponent} from './media-drawer-item/media-drawer-item.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matAddPhotoAlternateOutline} from '@ng-icons/material-icons/outline';
import {matSubdirectoryArrowLeft, matUpload} from '@ng-icons/material-icons/baseline';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-media-drawer',
  imports: [
    MediaDrawerItemComponent,
    NgIcon,
    FormsModule
  ],
  standalone: true,
  providers: [provideIcons({matAddPhotoAlternateOutline, matSubdirectoryArrowLeft, matUpload})],
  templateUrl: './media-drawer.component.html',
  styleUrl: './media-drawer.component.css',
  host: {
    '(paste)': 'onPaste($event)',
  }
})
export class MediaDrawerComponent {

  items = model.required<IMediaAdderItem[]>();
  inputValue = '';

  allowDrop($event: DragEvent) {
    $event.preventDefault();
  }

  appendItem({file, url}: { file?: File, url?: string }) {
    const item: IMediaAdderItem = {
      file,
      url,
      type: file ? 'file' : 'url'
    };
    this.items.set([...this.items(), item]);
  }

  onFileInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files) {
      for (const f of input.files) {
        this.appendItem({file: f});
        (input.parentElement as HTMLFormElement).reset();
      }
    }
  }

  onPaste($event: ClipboardEvent) {
    if ($event.clipboardData && $event.clipboardData.files.length > 0) {
      $event.preventDefault();
      for (const f of $event.clipboardData.files) {
        this.appendItem({file: f});
      }
    }
  }

  onDrop($event: DragEvent) {
    $event.preventDefault();
    if ($event.dataTransfer) {
      for (const f of $event.dataTransfer.files) {
        this.appendItem({file: f});
      }
    }
  }

  onInputSend() {
    const isUrl = URL.canParse(this.inputValue);
    if (isUrl) {
      this.appendItem({url: this.inputValue});
      this.inputValue = '';
    }

  }


  delete(index: number) {
    this.items().splice(index, 1);
    this.items.set(this.items());
  }
}
