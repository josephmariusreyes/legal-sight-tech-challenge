
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpeechDataService } from '../../../../services/speech-data.service';
import { ISpeech } from '../../../../interfaces/data/ispeech.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISpeechForm } from '../../../../interfaces/form/ispeechform';
import { createSpeechFormGroup } from '../../../../helpers/form-helper';

@Component({
  selector: 'app-saved-speech-list',
  templateUrl: './saved-speech-list.component.html',
  standalone: false,
  styleUrls: ['./saved-speech-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedSpeechListComponent implements OnInit, OnDestroy {

  //FormGroup
  speechFormGroup!: FormGroup<ISpeechForm>;

  selectedSpeech: ISpeech | null = null;
  speeches: ISpeech[] = [];
  filteredSpeeches: ISpeech[] = [];

  isMobileMenuOpen = false;
  searchQuery: string = '';
  isNewSpeech: boolean = false;
  readyToShowPage: boolean = false;
  showShareDialog: boolean = false;

  private routeSub?: Subscription;

  constructor(
    private speechDataService: SpeechDataService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Remove the manual initialization call since it's now handled at app level
    this.speechDataService.getSpeeches().subscribe((speeches: ISpeech[]) => {
      this.speeches = speeches;
      this.filteredSpeeches = speeches; // Initialize filtered speeches
      this.readyToShowPage = true; // Set to true after speeches are loaded
    });

    // Listen for route param changes
    this.routeSub = this.route.params.subscribe(params => {

      this.isNewSpeech = this.router.url.includes('new-speech');
      if (this.isNewSpeech) {
        this.speechFormGroup = createSpeechFormGroup(this.fb, this.selectedSpeech ?? null);
      } else {
        const id = params['id'];
        if (id) {
          const speechId = Number(id);
          this.speechDataService.getSpeechById(speechId).subscribe(speech => {
            this.selectedSpeech = speech || null;
            this.speechFormGroup = createSpeechFormGroup(this.fb, this.selectedSpeech ?? null);
          });
        } else {
          // fallback: select first speech if available
          this.selectedSpeech = this.speeches.length > 0 ? this.speeches[0] : null;
          this.speechFormGroup = createSpeechFormGroup(this.fb, this.selectedSpeech ?? null);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filterSpeeches();
    } else {
      // If search query is empty, show all speeches
      this.filteredSpeeches = [...this.speeches];
    }
  }

  private filterSpeeches(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredSpeeches = this.speeches.filter(speech => {
      // Search in title
      const titleMatch = speech.title?.toLowerCase().includes(query);

      // Search in author
      const authorMatch = speech.author?.toLowerCase().includes(query);

      // Search in content
      const contentMatch = speech.content?.toLowerCase().includes(query);

      // Search in subject areas
      const subjectMatch = speech.subjectArea?.some(subject =>
        subject.toLowerCase().includes(query)
      );

      return titleMatch || authorMatch || contentMatch || subjectMatch;
    });
  }

  onSearchInputChange(): void {
    // Real-time search as user types
    this.onSearch();
  }
  onDeleteSpeech(speechId: number): void {
    // TODO: Implement delete functionality
  }

  onViewSpeech(): void {
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onAddKeyword(): void {
    const newSubjectAreaKeyword = this.speechFormGroup.get('newSubjectAreaKeywords')?.value;
    if (!newSubjectAreaKeyword || !newSubjectAreaKeyword.trim()) {
      alert('Invalid subject area');
      return;
    }
    let keywords = this.speechFormGroup.get('subjectAreaKeywords')?.value || [];
    if (!keywords.includes(newSubjectAreaKeyword)) {
      keywords = [...keywords, newSubjectAreaKeyword];
      this.speechFormGroup.get('subjectAreaKeywords')?.setValue(keywords);
      this.speechFormGroup.get('subjectAreaKeywords')?.markAsDirty();

      // Update localStorage if we have a selected speech
      if (this.selectedSpeech) {
        const updatedSpeech: ISpeech = {
          ...this.selectedSpeech,
          subjectArea: keywords,
          updatedDate: new Date().toISOString()
        };
        this.speechDataService.updateSpeech(updatedSpeech).subscribe(updated => {
          if (updated) {
            this.selectedSpeech = updated;
          }
        });
      }
    }
    this.speechFormGroup.get('newSubjectAreaKeywords')?.setValue('');
  }

  onRemoveKeyword(index: number): void {
    let keywords = this.speechFormGroup.get('subjectAreaKeywords')?.value || [];
    keywords.splice(index, 1);
    this.speechFormGroup.get('subjectAreaKeywords')?.setValue([...keywords]);
    this.speechFormGroup.get('subjectAreaKeywords')?.markAsDirty();

    // Update localStorage if we have a selected speech
    if (this.selectedSpeech) {
      const updatedSpeech: ISpeech = {
        ...this.selectedSpeech,
        subjectArea: [...keywords],
        updatedDate: new Date().toISOString()
      };
      this.speechDataService.updateSpeech(updatedSpeech).subscribe(updated => {
        if (updated) {
          this.selectedSpeech = updated;
        }
      });
    }
  }

  onDeleteCurrentSpeech(): void {
    if (!this.selectedSpeech) {
      alert('No speech selected to delete');
      return;
    }

    if (confirm(`Are you sure you want to delete "${this.selectedSpeech.title || 'Speech ' + this.selectedSpeech.id}"?`)) {
      this.speechDataService.deleteSpeech(this.selectedSpeech.id).subscribe(deleted => {
        if (deleted) {
          // Navigate to the first available speech or back to main view
          this.speechDataService.getSpeeches().subscribe(speeches => {
            this.speeches = speeches;
            this.onSearch(); // Refresh filtered speeches after deletion
            if (speeches.length > 0) {
              this.router.navigate(['/speech-dashboard/saved-speeches', speeches[0].id]);
            } else {
              this.router.navigate(['/speech-dashboard/saved-speeches']);
            }
          });
        }
      });
    }
  }

  onSaveCurrentSpeech(): void {
    if (!this.speechFormGroup || !this.speechFormGroup.valid) {
      alert('Please fill in all required fields before saving');
      return;
    }

    const formValue = this.speechFormGroup.value;

    if (this.selectedSpeech) {
      // Update existing speech
      const updatedSpeech: ISpeech = {
        ...this.selectedSpeech,
        title: formValue.title || '',
        content: formValue.content || '',
        author: formValue.author || '',
        subjectArea: formValue.subjectAreaKeywords || [],
        updatedDate: new Date().toISOString()
      };

      this.speechDataService.updateSpeech(updatedSpeech).subscribe(updated => {
        if (updated) {
          this.selectedSpeech = updated;
          this.speechFormGroup.markAsPristine();
          alert('Speech saved successfully!');
        }
      });
    } else if (this.isNewSpeech) {
      // Create new speech
      const newSpeech: Omit<ISpeech, 'id'> = {
        title: formValue.title || '',
        content: formValue.content || '',
        author: formValue.author || '',
        subjectArea: formValue.subjectAreaKeywords || [],
        shareTo: [],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
      };

      this.speechDataService.createSpeech(newSpeech).subscribe(created => {
        if (created) {
          this.selectedSpeech = created;
          this.speechFormGroup.markAsPristine();
          alert('Speech created successfully!');
          // Navigate to the new speech
          this.router.navigate(['/speech-dashboard/saved-speeches', created.id]);
        }
      });
    }
  }

  onShareCurrentSpeech(): void {
    if (!this.selectedSpeech) {
      alert('No speech selected to share');
      return;
    }

    this.showShareDialog = true;
  }

  onSpeechUpdated(updatedSpeech: ISpeech): void {
    // Update the selected speech with the latest changes
    this.selectedSpeech = updatedSpeech;
    
    // Update the speeches array to reflect the changes
    const index = this.speeches.findIndex(speech => speech.id === updatedSpeech.id);
    if (index !== -1) {
      this.speeches[index] = updatedSpeech;
      this.onSearch(); // Refresh filtered speeches
    }
  }

}
