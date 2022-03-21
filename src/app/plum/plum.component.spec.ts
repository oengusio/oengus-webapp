import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumComponent } from './plum.component';

describe('PlumComponent', () => {
  let component: PlumComponent;
  let fixture: ComponentFixture<PlumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
