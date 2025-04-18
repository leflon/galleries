import {AsyncPipe} from '@angular/common';
import {Component, computed, effect, ElementRef, inject, signal, viewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {IGallery} from '../../models/gallery.model';
import {GalleryService} from '../../services/gallery.service';
import {GalleryCardComponent} from '../../components/gallery-card/gallery-card.component';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {matAddCircleOutline, matCheck} from '@ng-icons/material-icons/baseline';
import {ButtonComponent} from '../../../../shared/components/button/button.component';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-galleries-page',
  imports: [
    AsyncPipe,
    GalleryCardComponent,
    LoadingComponent,
    NgIcon,
    ButtonComponent,
    FormsModule
  ],
  viewProviders: [provideIcons({matAddCircleOutline, matCheck})],
  templateUrl: './my-galleries-page.component.html',
  styleUrl: './my-galleries-page.component.css'
})
export class MyGalleriesPageComponent {
  galleryService = inject(GalleryService);
  galleries$: Observable<IGallery[]>;
  router = inject(Router);

  isCreatingGallery = signal(false);
  isCreationLoading = signal(false);

  newGalleryModel = signal('');
  newGalleryName = computed(() => this.newGalleryModel().trim());

  newGalleryInput = viewChild<ElementRef<HTMLInputElement>>('newGalleryInput');

  constructor() {
    this.galleries$ = this.galleryService.getMyGalleries();
    effect(() => {
      if (this.isCreatingGallery()) {
        this.newGalleryInput()?.nativeElement.focus();
      }
    });
  }

  async addGallery() {
    if (!this.newGalleryName().length)
      return;
    this.isCreationLoading.set(true);
    try {
      const id = await this.galleryService.addGallery(this.newGalleryName());
      this.router.navigate(['/gallery', id]);
    } finally {
      this.newGalleryModel.set('');
      this.isCreationLoading.set(false);
      this.isCreatingGallery.set(false);
    }
  }

}
