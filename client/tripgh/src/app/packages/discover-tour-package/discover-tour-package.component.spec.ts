import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverTourPackageComponent } from './discover-tour-package.component';

describe('DiscoverTourPackageComponent', () => {
  let component: DiscoverTourPackageComponent;
  let fixture: ComponentFixture<DiscoverTourPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscoverTourPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverTourPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
