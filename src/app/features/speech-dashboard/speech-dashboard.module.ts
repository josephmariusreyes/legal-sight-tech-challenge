import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

// Routing
import { SpeechDashboardRoutingModule } from './speech-dashboard-routing.module';

// Components
import { SpeechListHeaderComponent } from './component/speech-list-header/speech-list-header.component';
import { NewSpeechComponent } from './component/new-speech/new-speech.component';
import { SelectedSpeechComponent } from './component/selected-speech/selected-speech.component';
import { SavedSpeechActionsComponent } from './component/saved-speech-actions/saved-speech-actions.component';
import { SavedSpeechListComponent } from './containers/saved-speech-list/saved-speech-list.component';

@NgModule({
  declarations: [
    SavedSpeechListComponent,
    SpeechListHeaderComponent,
    SelectedSpeechComponent,
    NewSpeechComponent,
    SavedSpeechActionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpeechDashboardRoutingModule,
    // PrimeNG Modules
    ButtonModule,
    CardModule,
    TooltipModule,
    InputTextModule,
    TextareaModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: []
})
export class SpeechDashboardModule { }