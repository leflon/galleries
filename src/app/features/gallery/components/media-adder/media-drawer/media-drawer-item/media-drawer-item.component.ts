import {Component, inject, input, output, signal} from '@angular/core';
import {IMediaAdderItem} from '../../../../models/mediaAdderItem.model';
import {LoadingComponent} from '../../../../../../shared/components/loading/loading.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matClose} from '@ng-icons/material-icons/baseline';
import {Functions, httpsCallable} from '@angular/fire/functions';

@Component({
  selector: 'app-media-drawer-item',
  imports: [
    LoadingComponent,
    NgIcon
  ],
  viewProviders: [provideIcons({matClose})],
  templateUrl: './media-drawer-item.component.html',
  styleUrl: './media-drawer-item.component.css'
})
export class MediaDrawerItemComponent {
  functions = inject(Functions);
  data = input.required<IMediaAdderItem>();

  imgSrc = signal<string | null>(null);
  isFailed = signal(false);

  delete = output();


  async ngOnInit() {
    if (this.data().file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imgSrc.set(reader.result as string);
      });
      reader.addEventListener('error', () => {
        this.isFailed.set(true);
      });
      if (this.data().file) {
        reader.readAsDataURL(this.data().file!);
      } else {
        this.imgSrc.set(null);
      }
    } else {
      const url = this.data().url!;
      const f = httpsCallable(this.functions, 'checkImage');
      const res = await f({url});
      const valid = (res.data as { valid: boolean }).valid;
      if (!valid) {
        this.isFailed.set(true);
      } else
        this.imgSrc.set(url);
    }
  }
}
