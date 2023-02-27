import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionSettingsComponent } from './submission-settings.component';

describe('SubmissionSettingsComponent', () => {
  let component: SubmissionSettingsComponent;
  let fixture: ComponentFixture<SubmissionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
