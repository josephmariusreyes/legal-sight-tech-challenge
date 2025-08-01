import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/speech-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'speech-dashboard',
    loadChildren: () => import('./features/speech-dashboard/speech-dashboard.module').then(m => m.SpeechDashboardModule)
  },
  {
    path: '**',
    redirectTo: '/speech-dashboard'
  }
];