

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Speech {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

const LOCAL_STORAGE_KEY = 'speeches';

@Injectable({
  providedIn: 'root',
})
export class SpeechDataService {
  private speechesUrl = '/public/speeches.json';

  constructor(private http: HttpClient) {
    this.initLocalStorage();
  }

  // Initialize local storage with speeches.json if not already present
  private initLocalStorage(): void {
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
      this.http.get<Speech[]>(this.speechesUrl).pipe(
        catchError(() => of([]))
      ).subscribe((data) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      });
    }
  }

  // Helper to get speeches from local storage
  private getSpeechesFromLocalStorage(): Speech[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Helper to save speeches to local storage
  private saveSpeechesToLocalStorage(speeches: Speech[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(speeches));
  }

  // Load all speeches
  getSpeeches(): Observable<Speech[]> {
    return of(this.getSpeechesFromLocalStorage());
  }

  // Get a single speech by id
  getSpeechById(id: number): Observable<Speech | undefined> {
    return of(this.getSpeechesFromLocalStorage().find(s => s.id === id));
  }

  // Create a new speech
  createSpeech(speech: Omit<Speech, 'id'>): Observable<Speech> {
    const speeches = this.getSpeechesFromLocalStorage();
    const newId = speeches.length > 0 ? Math.max(...speeches.map(s => s.id)) + 1 : 1;
    const newSpeech: Speech = { ...speech, id: newId };
    speeches.push(newSpeech);
    this.saveSpeechesToLocalStorage(speeches);
    return of(newSpeech);
  }

  // Update an existing speech
  updateSpeech(updated: Speech): Observable<Speech | undefined> {
    const speeches = this.getSpeechesFromLocalStorage();
    const idx = speeches.findIndex(s => s.id === updated.id);
    if (idx > -1) {
      speeches[idx] = updated;
      this.saveSpeechesToLocalStorage(speeches);
      return of(updated);
    }
    return of(undefined);
  }

  // Delete a speech by id
  deleteSpeech(id: number): Observable<boolean> {
    const speeches = this.getSpeechesFromLocalStorage();
    const filtered = speeches.filter(s => s.id !== id);
    const deleted = filtered.length !== speeches.length;
    this.saveSpeechesToLocalStorage(filtered);
    return of(deleted);
  }
}
