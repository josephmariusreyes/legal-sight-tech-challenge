import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { ISpeechForm } from "../interfaces/form/ispeechform";
import { ISpeech } from "../interfaces/data/ispeech.interface";

function formatDate(dateString: string | undefined): string | null {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return null;
    
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
}

export function createSpeechFormGroup(fb: FormBuilder, selectedSpeech:ISpeech | null): FormGroup<ISpeechForm> {
    return fb.group({
        title: fb.control(selectedSpeech?.title, { validators: [Validators.required] }),
        content: fb.control(selectedSpeech?.content, { validators: [Validators.required] }),
        author: fb.control(selectedSpeech?.author, { validators: [Validators.required] }),
        subjectAreaKeywords: fb.control(selectedSpeech?.subjectArea),
        newSubjectAreaKeywords: fb.control(''),
        createdDate: fb.control(formatDate(selectedSpeech?.createdDate)),
    }) as FormGroup<ISpeechForm>;
}