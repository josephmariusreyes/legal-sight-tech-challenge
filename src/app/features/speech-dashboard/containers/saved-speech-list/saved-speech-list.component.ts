import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-speech-list',
  templateUrl: './saved-speech-list.component.html',
  standalone:false,
  styleUrls: ['./saved-speech-list.component.scss']
})
export class SavedSpeechListComponent implements OnInit {

  savedSpeeches: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadSavedSpeeches();
  }

  loadSavedSpeeches(): void {
    // TODO: Implement loading saved speeches from service
    this.savedSpeeches = [
      {
        id: 1,
        title: 'Sample Speech 1',
        date: new Date(),
        transcript: 'This is a sample speech transcript...'
      },
      {
        id: 2,
        title: 'Sample Speech 2',
        date: new Date(),
        transcript: 'This is another sample speech transcript...'
      }
    ];
  }

  onDeleteSpeech(speechId: number): void {
    // TODO: Implement delete functionality
    this.savedSpeeches = this.savedSpeeches.filter(speech => speech.id !== speechId);
  }

  onEditSpeech(speechId: number): void {
    // TODO: Implement edit functionality
    console.log('Edit speech with ID:', speechId);
  }

  onViewSpeech(speechId: number): void {
    // TODO: Implement view functionality
    console.log('View speech with ID:', speechId);
  }
}
