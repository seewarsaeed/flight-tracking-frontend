import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlightComponent } from './my-flight.component';

describe('MyFlightComponent', () => {
  let component: MyFlightComponent;
  let fixture: ComponentFixture<MyFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFlightComponent]
    });
    fixture = TestBed.createComponent(MyFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
