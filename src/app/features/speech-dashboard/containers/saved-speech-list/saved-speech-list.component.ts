import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpeechDataService } from '../../../../services/speech-data.service';
import { ISpeech } from '../../../../interfaces/data/ispeech.interface';

@Component({
  selector: 'app-saved-speech-list',
  templateUrl: './saved-speech-list.component.html',
  standalone:false,
  styleUrls: ['./saved-speech-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedSpeechListComponent implements OnInit {

  selectedSpeech:ISpeech | null = null;
  speeches: ISpeech[] = [];

  constructor(private speechDataService: SpeechDataService) { }

  ngOnInit(): void {
    this.initializeAndLoadSpeeches();

    this.speechDataService.getSpeeches().subscribe((speeches: ISpeech[]) => {
      this.speeches = speeches;
    });


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
  }

  private async initializeAndLoadSpeeches(): Promise<void> {
    await this.speechDataService.initLocalStorage();
  }

}
