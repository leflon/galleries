import { Routes } from '@angular/router';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: 'my-galleries',
    loadComponent: () => import('./pages/my-galleries-page/my-galleries-page.component').then(m => m.MyGalleriesPageComponent)
  },
  {
    path: 'gallery/:id',
    loadComponent: () => import('./pages/gallery-page/gallery-page.component').then(m => m.GalleryPageComponent)
  }
];
