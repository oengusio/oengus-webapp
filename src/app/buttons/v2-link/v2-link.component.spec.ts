import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2LinkComponent } from './v2-link.component';

describe('V2LinkComponent', () => {
  let component: V2LinkComponent;
  let fixture: ComponentFixture<V2LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2LinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
