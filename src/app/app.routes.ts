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
    path: 'songs/all-songs',
    loadComponent: () => import('./pages/all-songs/all-songs.page').then( m => m.AllSongsPage)
  },
  {
    path: 'songs/search-songs',
    loadComponent: () => import('./pages/search-songs/search-songs.page').then( m => m.SearchSongsPage)
  },
  {
    path: 'songs/song-details/:songId',
    loadComponent: () => import('./pages/song-details/song-details.page').then( m => m.SongDetailsPage)
  },
  {
    path: 'turbomember-zone',
    //canMatch: [() => inject(AuthService).isLoggedIn()],
    loadComponent: () => import('./private-pages/turbomember-zone/turbomember-zone.page').then( m => m.TurbomemberZonePage),
  },
  {
    path: 'turbomember-zone/add-song',
    //canMatch: [() => inject(AuthService).isLoggedIn()],
    loadComponent: () => import('./private-pages/add-song/add-song.page').then( m => m.AddSongPage),
  },
  {
    path: 'turbomember-zone/import-song',
    //canMatch: [() => inject(AuthService).isLoggedIn()],
    loadComponent: () => import('./private-pages/import-song/import-song.page').then( m => m.ImportSongPage)
  },
  {
    path: 'turbomember-zone/edit-song/:songId',
    //canMatch: [() => inject(AuthService).isLoggedIn()],
    loadComponent: () => import('./private-pages/edit-song/edit-song.page').then( m => m.EditSongPage)
  },
];
