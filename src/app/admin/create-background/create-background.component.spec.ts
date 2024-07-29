import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBackgroundComponent } from './create-background.component';

describe('CreateBackgroundComponent', () => {
  let component: CreateBackgroundComponent;
  let fixture: ComponentFixture<CreateBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBackgroundComponent]
    });
    fixture = TestBed.createComponent(CreateBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
