import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/pages/home/home.component'),
  },
  {
    path: 'character-list',
    loadComponent: () => import('./components/pages/characters/character-list/character-list.component'),
  },
  {
    path: 'character-details/:id',
    loadComponent: () => import('./components/pages/characters/character-details/character-details.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
