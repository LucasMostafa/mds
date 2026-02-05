import { Routes } from '@angular/router';
import { HomeView } from './features/home/pages/home-view/home-view';

export const routes: Routes = [
  { path: '', component: HomeView },
  { path: '**', redirectTo: '' }
];