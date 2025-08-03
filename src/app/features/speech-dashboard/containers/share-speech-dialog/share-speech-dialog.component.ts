import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISpeech } from '../../../../interfaces/data/ispeech.interface';
import { SpeechDataService } from '../../../../services/speech-data.service';

@Component({
  selector: 'app-share-speech-dialog',
  templateUrl: './share-speech-dialog.component.html',
  styleUrls: ['./share-speech-dialog.component.scss'],
  standalone: false
})
export class ShareSpeechDialogComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() selectedSpeech: ISpeech | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() speechUpdated = new EventEmitter<ISpeech>();

  shareForm: FormGroup;
  emailAddresses: string[] = [];

  constructor(
    private fb: FormBuilder,
    private speechDataService: SpeechDataService
  ) {
    this.shareForm = this.fb.group({
      newEmail: ['', [Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedSpeech'] && this.selectedSpeech) {
      // Initialize email addresses from the shareTo field
      this.emailAddresses = [...(this.selectedSpeech.shareTo || [])];
    }
    
    // Reinitialize email addresses when dialog becomes visible
    if (changes['visible'] && this.visible && this.selectedSpeech) {
      this.emailAddresses = [...(this.selectedSpeech.shareTo || [])];
    }
  }

  onHide() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  onAddEmail() {
    const emailControl = this.shareForm.get('newEmail');
    const email = emailControl?.value?.trim();

    if (!email) {
      alert('Please enter an email address');
      return;
    }

    if (emailControl?.invalid) {
      alert('Please enter a valid email address');
      return;
    }

    if (this.emailAddresses.includes(email)) {
      alert('This email address is already added');
      return;
    }

    this.emailAddresses.push(email);
    emailControl?.setValue('');

    // Update localStorage if we have a selected speech
    this.updateSpeechShareTo();
  }

  onRemoveEmail(index: number) {
    this.emailAddresses.splice(index, 1);
    
    // Update localStorage if we have a selected speech
    this.updateSpeechShareTo();
  }

  onSend() {
    if (this.emailAddresses.length === 0) {
      alert('Please add at least one email address');
      return;
    }

    this.onSendSpeechEmails([...this.emailAddresses]);
    this.onHide();
  }

  onSendSpeechEmails(emailAddresses: string[]): void {
    if (!this.selectedSpeech || emailAddresses.length === 0) {
      return;
    }

    // Simulate sending emails
    const emailList = emailAddresses.join(', ');
    alert(`Email sent successfully to: ${emailList}`);
    
    // You can add actual email sending logic here
    console.log('Sending speech to:', emailAddresses);
    console.log('Speech details:', this.selectedSpeech);
  }

  private resetForm() {
    this.shareForm.reset();
    // Don't clear emailAddresses here - they should persist from the speech data
  }

  private updateSpeechShareTo() {
    if (!this.selectedSpeech) {
      return;
    }

    const updatedSpeech: ISpeech = {
      ...this.selectedSpeech,
      shareTo: [...this.emailAddresses],
      updatedDate: new Date().toISOString()
    };

    this.speechDataService.updateSpeech(updatedSpeech).subscribe(updated => {
      if (updated) {
        this.selectedSpeech = updated;
        this.onSpeechUpdated(updated);
      }
    });
  }

  onSpeechUpdated(updatedSpeech: ISpeech): void {
    // Update the selected speech with the latest changes
    this.selectedSpeech = updatedSpeech;
    
    // Emit the updated speech to the parent component
    this.speechUpdated.emit(updatedSpeech);
  }

  onEnterKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onAddEmail();
    }
  }
}
