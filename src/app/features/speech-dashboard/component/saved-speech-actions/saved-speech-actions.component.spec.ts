import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSpeechActionsComponent } from './saved-speech-actions.component';

describe('SavedSpeechActionsComponent', () => {
  let component: SavedSpeechActionsComponent;
  let fixture: ComponentFixture<SavedSpeechActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedSpeechActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedSpeechActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
