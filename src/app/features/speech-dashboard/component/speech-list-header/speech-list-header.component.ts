import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-speech-list-header',
  templateUrl: './speech-list-header.component.html',
  styleUrls: ['./speech-list-header.component.scss'],
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechListHeaderComponent {}
