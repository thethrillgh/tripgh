import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthernTourPackageComponent } from './northern-tour-package.component';

describe('NorthernTourPackageComponent', () => {
  let component: NorthernTourPackageComponent;
  let fixture: ComponentFixture<NorthernTourPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NorthernTourPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthernTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
