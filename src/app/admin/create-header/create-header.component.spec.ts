import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeaderComponent } from './create-header.component';

describe('CreateHeaderComponent', () => {
  let component: CreateHeaderComponent;
  let fixture: ComponentFixture<CreateHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHeaderComponent]
    });
    fixture = TestBed.createComponent(CreateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
