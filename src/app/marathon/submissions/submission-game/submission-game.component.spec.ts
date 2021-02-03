import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionGameComponent } from './submission-game.component';

describe('SubmissionGameComponent', () => {
  let component: SubmissionGameComponent;
  let fixture: ComponentFixture<SubmissionGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
