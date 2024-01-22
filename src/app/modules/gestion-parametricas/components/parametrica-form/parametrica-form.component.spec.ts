import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametricaFormComponent } from './parametrica-form.component';

describe('ParametricaFormComponent', () => {
  let component: ParametricaFormComponent;
  let fixture: ComponentFixture<ParametricaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametricaFormComponent]
    });
    fixture = TestBed.createComponent(ParametricaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
