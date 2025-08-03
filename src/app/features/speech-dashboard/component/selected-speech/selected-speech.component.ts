import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-selected-speech',
  templateUrl: './selected-speech.component.html',
  styleUrls: ['./selected-speech.component.scss'],
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedSpeechComponent {}
