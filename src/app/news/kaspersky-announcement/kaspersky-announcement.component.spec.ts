import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KasperskyAnnouncementComponent } from './kaspersky-announcement.component';

describe('KasperskyAnnouncementComponent', () => {
  let component: KasperskyAnnouncementComponent;
  let fixture: ComponentFixture<KasperskyAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KasperskyAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KasperskyAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
