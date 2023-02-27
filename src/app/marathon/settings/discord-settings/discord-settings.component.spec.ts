import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscordSettingsComponent } from './discord-settings.component';

describe('DiscordSettingsComponent', () => {
  let component: DiscordSettingsComponent;
  let fixture: ComponentFixture<DiscordSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscordSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscordSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
