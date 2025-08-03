import { FormControl } from "@angular/forms";

export interface ISpeechForm {
  title: FormControl<string | null>;
  content: FormControl<string | null>;
  author: FormControl<string | null>;
  subjectAreaKeywords: FormControl<string[] | null>;
  newSubjectAreaKeywords: FormControl<string | null>;
  createdDate: FormControl<string | null>;
}