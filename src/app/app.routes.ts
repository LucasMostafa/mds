import { Routes } from '@angular/router';
import { HomeView } from './features/home/pages/home-view/home-view';
import { SolutionsView } from './features/solutions/pages/solutions-view/solutions-view';

export const routes: Routes = [
  { path: '', component: HomeView },
  { path: 'solutions', component: SolutionsView },
  { path: '**', redirectTo: '' }
];