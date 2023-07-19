import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAppertFormComponent } from './basic-appert-form.component';

describe('BasicAppertFormComponent', () => {
  let component: BasicAppertFormComponent;
  let fixture: ComponentFixture<BasicAppertFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicAppertFormComponent]
    });
    fixture = TestBed.createComponent(BasicAppertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
