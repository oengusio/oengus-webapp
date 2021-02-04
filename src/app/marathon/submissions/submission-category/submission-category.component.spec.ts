import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCategoryComponent } from './submission-category.component';

describe('SubmissionCategoryComponent', () => {
  let component: SubmissionCategoryComponent;
  let fixture: ComponentFixture<SubmissionCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
