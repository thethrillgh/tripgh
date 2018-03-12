import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcotourismTourPackageComponent } from './ecotourism-tour-package.component';

describe('EcotourismTourPackageComponent', () => {
  let component: EcotourismTourPackageComponent;
  let fixture: ComponentFixture<EcotourismTourPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcotourismTourPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcotourismTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
