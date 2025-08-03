import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speech-list-header',
  templateUrl: './speech-list-header.component.html',
  styleUrls: ['./speech-list-header.component.scss'],
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechListHeaderComponent {
  @Input() isMobileMenuOpen: boolean = false;
  @Output() toggleMobileMenu = new EventEmitter<void>();

  constructor(public router: Router) {}

  get isSavedSpeechesActive(): boolean {
    return this.router.url.includes('saved-speeches');
  }

  get isNewSpeechActive(): boolean {
    return this.router.url.includes('new-speech');
  }

  onToggleMobileMenu(): void {
    this.toggleMobileMenu.emit();
  }
}
