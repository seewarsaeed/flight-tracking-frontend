import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNavbarComponent } from './r-navbar.component';

describe('RNavbarComponent', () => {
  let component: RNavbarComponent;
  let fixture: ComponentFixture<RNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RNavbarComponent]
    });
    fixture = TestBed.createComponent(RNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
