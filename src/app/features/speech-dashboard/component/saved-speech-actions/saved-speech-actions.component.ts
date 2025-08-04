import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-saved-speech-actions',
  templateUrl: './saved-speech-actions.component.html',
  styleUrls: ['./saved-speech-actions.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedSpeechActionsComponent {

  @Input() isNewSpeech: boolean = false;
  @Output() delete = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() share = new EventEmitter<void>();

  onDelete(): void {
    this.delete.emit();
  }

  onSave(): void {
    this.save.emit();
  }

  onShare(): void {
    this.share.emit();
  }
}
