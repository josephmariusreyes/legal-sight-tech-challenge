import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SavedSpeechListComponent } from './containers/saved-speech-list/saved-speech-list.component';
import { TestContentComponent } from './component/test-content/test-content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'saved-speeches',
    pathMatch: 'full'
  },
  {
    path: 'saved-speeches',
    component: SavedSpeechListComponent,
    children: [
      {
        path: 'test-path',
        component: TestContentComponent
      }
    ]
  },
  {
    path: 'new-speech',
    component: SavedSpeechListComponent
  },
  {
    path: 'saved-speeches/:id',
    component: SavedSpeechListComponent,
    children: [
      {
        path: 'test-path',
        component: TestContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeechDashboardRoutingModule { }