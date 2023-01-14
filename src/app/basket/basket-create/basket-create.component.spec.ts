import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketCreateComponent } from './basket-create.component';

describe('BasketCreateComponent', () => {
  let component: BasketCreateComponent;
  let fixture: ComponentFixture<BasketCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
