import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccraTourPackageComponent } from './accra-tour-package.component';

describe('AccraTourPackageComponent', () => {
  let component: AccraTourPackageComponent;
  let fixture: ComponentFixture<AccraTourPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccraTourPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccraTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
