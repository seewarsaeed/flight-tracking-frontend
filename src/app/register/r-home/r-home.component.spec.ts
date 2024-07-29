import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RHomeComponent } from './r-home.component';

describe('RHomeComponent', () => {
  let component: RHomeComponent;
  let fixture: ComponentFixture<RHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RHomeComponent]
    });
    fixture = TestBed.createComponent(RHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
