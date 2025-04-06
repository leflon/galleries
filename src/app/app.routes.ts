import {Routes} from '@angular/router';
import {authGuard} from './shared/guards/auth.guard';
import {galleryAccessGuard} from './features/gallery/guards/gallery-access.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'my-galleries'
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth-page.component').then(m => m.AuthPageComponent)
  },
  {
    path: 'my-galleries',
    loadComponent: () => import('./features/gallery/pages/my-galleries/my-galleries-page.component').then(m => m.MyGalleriesPageComponent),
    canMatch: [authGuard]
  },
  {
    path: 'gallery/:id',
    loadComponent: () => import('./features/gallery/pages/gallery/gallery-page.component').then(m => m.GalleryPageComponent),
    canMatch: [galleryAccessGuard],
    children: [
      {
        path: 'add',
        loadComponent: () => import('./features/gallery/pages/gallery/gallery-page.component').then(m => m.GalleryPageComponent),
        data: {
          isAdding: true
        }
      },
      {
        path: ':mediaId',
        loadComponent: () => import('./features/gallery/pages/gallery/gallery-page.component').then(m => m.GalleryPageComponent),
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];
