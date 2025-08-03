import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-speech',
  templateUrl: './new-speech.component.html',
  styleUrls: ['./new-speech.component.scss'],
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSpeechComponent {}
