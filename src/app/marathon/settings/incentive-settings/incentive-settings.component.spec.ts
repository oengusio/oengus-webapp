import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentiveSettingsComponent } from './incentive-settings.component';

describe('IncentiveSettingsComponent', () => {
  let component: IncentiveSettingsComponent;
  let fixture: ComponentFixture<IncentiveSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncentiveSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentiveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
