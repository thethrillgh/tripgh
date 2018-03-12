import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureTourPackageComponent } from './culture-tour-package.component';

describe('CultureTourPackageComponent', () => {
  let component: CultureTourPackageComponent;
  let fixture: ComponentFixture<CultureTourPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CultureTourPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
