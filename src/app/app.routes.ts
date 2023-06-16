import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'all-songs',
    loadComponent: () => import('./pages/all-songs/all-songs.page').then( m => m.AllSongsPage)
  },
  {
    path: 'search-songs',
    loadComponent: () => import('./pages/search-songs/search-songs.page').then( m => m.SearchSongsPage)
  },
];
