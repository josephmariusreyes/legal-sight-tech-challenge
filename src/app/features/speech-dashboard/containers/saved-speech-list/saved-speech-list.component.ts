import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpeechDataService } from '../../../../services/speech-data.service';
import { ISpeech } from '../../../../interfaces/data/ispeech.interface';

@Component({
  selector: 'app-saved-speech-list',
  templateUrl: './saved-speech-list.component.html',
  standalone:false,
  styleUrls: ['./saved-speech-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedSpeechListComponent implements OnInit, OnDestroy {

  selectedSpeech: ISpeech | null = null;
  private routeSub?: Subscription;
  speeches: ISpeech[] = [];
  isMobileMenuOpen = false;
  searchQuery: string = '';
  isNewSpeech:boolean = false;

  constructor(
    private speechDataService: SpeechDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeAndLoadSpeeches();
    // Set isNewSpeech based on current route
    this.isNewSpeech = this.router.url.includes('new-speech');

    this.speechDataService.getSpeeches().subscribe((speeches: ISpeech[]) => {
      this.speeches = speeches;
    });

    // Listen for route param changes
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const speechId = Number(id);
        this.speechDataService.getSpeechById(speechId).subscribe(speech => {
          this.selectedSpeech = speech || null;
        });
      } else {
        // fallback: select first speech if available
        this.selectedSpeech = this.speeches.length > 0 ? this.speeches[0] : null;
      }
    });
  }
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', this.searchQuery);
    }
  }
  onDeleteSpeech(speechId: number): void {
    // TODO: Implement delete functionality
  }

  onEditSpeech(speechId: number): void {
    // TODO: Implement edit functionality
    console.log('Edit speech with ID:', speechId);
  }

  onViewSpeech(speechId: number): void {
    // TODO: Implement view functionality
    console.log('View speech with ID:', speechId);
    // Close mobile menu when a speech is selected
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  private async initializeAndLoadSpeeches(): Promise<void> {
    await this.speechDataService.initLocalStorage();
  }

}
