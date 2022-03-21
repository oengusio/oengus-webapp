import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OengusMdComponent } from './oengus-md.component';

describe('OengusMdComponent', () => {
  let component: OengusMdComponent;
  let fixture: ComponentFixture<OengusMdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OengusMdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OengusMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
