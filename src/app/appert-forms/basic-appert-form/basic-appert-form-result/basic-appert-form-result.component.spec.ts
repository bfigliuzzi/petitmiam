import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAppertFormResultComponent } from './basic-appert-form-result.component';

describe('BasicAppertFormResultComponent', () => {
  let component: BasicAppertFormResultComponent;
  let fixture: ComponentFixture<BasicAppertFormResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BasicAppertFormResultComponent]
    });
    fixture = TestBed.createComponent(BasicAppertFormResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
