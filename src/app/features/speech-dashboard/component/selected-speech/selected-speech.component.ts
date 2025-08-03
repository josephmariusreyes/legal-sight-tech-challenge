import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISpeech } from '../../../../interfaces/data/ispeech.interface';

@Component({
  selector: 'app-selected-speech',
  templateUrl: './selected-speech.component.html',
  styleUrls: ['./selected-speech.component.scss'],
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedSpeechComponent {
  @Input() selectedSpeech?: ISpeech | null;
  speechContent: string = '';

  ngOnChanges() {
    this.speechContent = this.selectedSpeech?.content || '';
  }
}
