import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekarteComponent } from './seekarte.component';

describe('SeekarteComponent', () => {
  let component: SeekarteComponent;
  let fixture: ComponentFixture<SeekarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
