import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {galleryAccessGuard} from './guards/gallery-access.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'my-galleries'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth-page/auth-page.component').then(m => m.AuthPageComponent)
  },
  {
    path: 'my-galleries',
    loadComponent: () => import('./pages/my-galleries-page/my-galleries-page.component').then(m => m.MyGalleriesPageComponent),
    canMatch: [authGuard]
  },
  {
    path: 'gallery/:id',
    loadComponent: () => import('./pages/gallery-page/gallery-page.component').then(m => m.GalleryPageComponent),
    canMatch: [galleryAccessGuard],
    children: [
      {
        path: ':mediaId',
        loadComponent: () => import('./pages/gallery-page/gallery-page.component').then(m => m.GalleryPageComponent),
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];
