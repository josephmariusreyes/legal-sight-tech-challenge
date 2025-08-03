import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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
  


  onToggleMobileMenu(): void {
    this.toggleMobileMenu.emit();
  }
}
