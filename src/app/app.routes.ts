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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
