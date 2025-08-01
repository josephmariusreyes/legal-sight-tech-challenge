import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SavedSpeechListComponent } from './containers/saved-speech-list/saved-speech-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'saved-speeches',
    pathMatch: 'full'
  },
  {
    path: 'saved-speeches',
    component: SavedSpeechListComponent
  },
  // Add more routes here as needed
  // {
  //   path: 'new-speech',
  //   component: NewSpeechComponent
  // },
  // {
  //   path: 'speech/:id',
  //   component: SpeechDetailsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeechDashboardRoutingModule { }