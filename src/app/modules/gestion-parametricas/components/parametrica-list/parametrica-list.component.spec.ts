import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametricaListComponent } from './parametrica-list.component';

describe('ParametricaListComponent', () => {
  let component: ParametricaListComponent;
  let fixture: ComponentFixture<ParametricaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametricaListComponent]
    });
    fixture = TestBed.createComponent(ParametricaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
