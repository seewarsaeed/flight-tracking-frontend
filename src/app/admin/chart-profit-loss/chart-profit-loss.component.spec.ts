import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProfitLossComponent } from './chart-profit-loss.component';

describe('ChartProfitLossComponent', () => {
  let component: ChartProfitLossComponent;
  let fixture: ComponentFixture<ChartProfitLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartProfitLossComponent]
    });
    fixture = TestBed.createComponent(ChartProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
