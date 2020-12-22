import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronsComponent } from './patrons.component';

describe('PatronComponent', () => {
  let component: PatronsComponent;
  let fixture: ComponentFixture<PatronsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
