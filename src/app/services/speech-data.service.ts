


import { ISpeech } from '../interfaces/data/ispeech.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const LOCAL_STORAGE_KEY = 'speeches';

@Injectable({
  providedIn: 'root',
})
export class SpeechDataService {
  private speechesUrl = '/speeches.json';

  constructor(private http: HttpClient) {}

  // Initialize local storage with speeches.json if not already present
  async initLocalStorage(): Promise<void> {
    const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedData = existingData ? JSON.parse(existingData) : null;
    
    if (!existingData || (Array.isArray(parsedData) && parsedData.length === 0)) {
      return new Promise((resolve, reject) => {
        this.http.get<ISpeech[]>(this.speechesUrl).pipe(
          catchError(() => of([]))
        ).subscribe({
          next: (data) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            resolve();
          },
          error: (error) => {
            reject(error);
          }
        });
      });
    }
    return Promise.resolve();
  }

  // Helper to get speeches from local storage
  private getSpeechesFromLocalStorage(): ISpeech[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Helper to save speeches to local storage
  private saveSpeechesToLocalStorage(speeches: ISpeech[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(speeches));
  }

  // Load all speeches
  getSpeeches(): Observable<ISpeech[]> {
    return of(this.getSpeechesFromLocalStorage());
  }

  // Get a single speech by id
  getSpeechById(id: number): Observable<ISpeech | undefined> {
    return of(this.getSpeechesFromLocalStorage().find(s => s.id === id));
  }

  // Create a new speech
  createSpeech(speech: Omit<ISpeech, 'id'>): Observable<ISpeech> {
    const speeches = this.getSpeechesFromLocalStorage();
    const newId = speeches.length > 0 ? Math.max(...speeches.map(s => s.id)) + 1 : 1;
    const newSpeech: ISpeech = { ...speech, id: newId };
    speeches.push(newSpeech);
    this.saveSpeechesToLocalStorage(speeches);
    return of(newSpeech);
  }

  // Update an existing speech
  updateSpeech(updated: ISpeech): Observable<ISpeech | undefined> {
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
