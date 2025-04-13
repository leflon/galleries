import {Component, computed, effect, ElementRef, inject, input, signal, viewChild} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {matCheck, matClose, matDelete, matEdit} from '@ng-icons/material-icons/baseline';
import {MediaService} from '../../services/media.service';
import {AsyncPipe} from '@angular/common';
import {IMedia} from '../../models/media.model';
import {GalleryService} from '../../services/gallery.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';


@Component({
  selector: 'app-gallery-card',
  imports: [
    NgIcon,
    ButtonComponent,
    AsyncPipe,
    FormsModule,
    LoadingComponent
  ],
  viewProviders: [provideIcons({matDelete, matEdit, matClose, matCheck})],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.css'
})
export class GalleryCardComponent {

  galleryId = input.required<string>();
  galleryName = input.required<string>();

  isEditing = signal(false);
  isLoading = signal(false);
  inputValue = signal('');
  newName = computed(() => this.inputValue().trim());

  input = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  router = inject(Router);
  media = inject(MediaService);
  gallery = inject(GalleryService);

  thumbnails!: Promise<IMedia[]>;
  itemCount!: Promise<number>;
  protected readonly alert = alert;

  constructor() {
    effect(() => {
      if (this.isEditing()) {
        setTimeout(() => {
          this.input()?.nativeElement.focus();
          this.input()?.nativeElement.select();
        })
      }
    });
  }

  async updateGalleryName($event: Event) {
    $event.stopPropagation();
    if (this.newName() === this.galleryName() || this.newName() === '' || this.isLoading())
      return;

    this.isLoading.set(true);
    await this.gallery.renameGallery(this.galleryId(), this.newName())
    this.isLoading.set(false);
    this.isEditing.set(false);
  }

  navigate() {
    if (this.isEditing()) return;

    this.router.navigate(['..', 'gallery', this.galleryId()]);
  }

  ngOnInit() {
    this.inputValue.set(this.galleryName());
    this.thumbnails = this.media.getGalleryThumbnails(this.galleryId());
    this.itemCount = this.gallery.getItemCount(this.galleryId());
  }
}
