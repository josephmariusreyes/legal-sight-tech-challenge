import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ISpeech } from '../../../../interfaces/data/ispeech.interface';
import { createSpeechFormGroup } from '../../../../helpers/form-helper';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISpeechForm } from '../../../../interfaces/form/ispeechform';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-selected-speech',
  templateUrl: './selected-speech.component.html',
  styleUrls: ['./selected-speech.component.scss'],
  standalone:false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedSpeechComponent implements OnChanges, OnInit, OnDestroy {

  //FormGroup
  @Input() speechFormGroup!: FormGroup<ISpeechForm>;
  //component variables
  subjectAreaKeywords: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  @Output() addKeyword = new EventEmitter<void>();
  @Output() removeKeyword = new EventEmitter<number>();

  ngOnInit() {
    this.subscribeToFormChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['speechFormGroup'] && this.speechFormGroup) {
      this.subscribeToFormChanges();
    }
  }

  onAddSubjectAreaKeyword() {
    this.addKeyword.emit();
  }

  onRemoveSubjectAreaKeyword(index: number) {
    this.removeKeyword.emit(index);
  }

  // Helper method to check if a field is invalid and touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.speechFormGroup?.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Helper method to check if a field is valid and touched
  isFieldValid(fieldName: string): boolean {
    const field = this.speechFormGroup?.get(fieldName);
    return !!(field && field.valid && field.touched && field.value?.toString().trim());
  }

  // Helper method to get error message for a field
  getFieldError(fieldName: string): string {
    const field = this.speechFormGroup?.get(fieldName);
    if (field?.errors?.['required']) {
      switch (fieldName) {
        case 'title': return 'Title is required';
        case 'content': return 'Content is required';
        case 'author': return 'Author is required';
        default: return `${fieldName} is required`;
      }
    }
    return '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToFormChanges() {
    if (this.speechFormGroup) {
      // Update initial value
      this.updateSubjectAreaKeywords();
      
      // Subscribe to value changes
      this.speechFormGroup.get('subjectAreaKeywords')?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateSubjectAreaKeywords();
          this.cdr.detectChanges();
        });

      // Subscribe to status changes for validation updates
      this.speechFormGroup.statusChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.cdr.detectChanges();
        });
    }
  }

  private updateSubjectAreaKeywords() {
    const keywords = this.speechFormGroup.get('subjectAreaKeywords')?.value;
    if (Array.isArray(keywords)) {
      this.subjectAreaKeywords = [...keywords];
    } else {
      this.subjectAreaKeywords = [];
    }
  }
}
