import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInfoWindowComponent } from './map-info-window.component';

describe('MapInfoWindowComponent', () => {
  let component: MapInfoWindowComponent;
  let fixture: ComponentFixture<MapInfoWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapInfoWindowComponent]
    });
    fixture = TestBed.createComponent(MapInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
