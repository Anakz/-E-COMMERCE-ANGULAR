import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketUpdateComponent } from './basket-update.component';

describe('BasketUpdateComponent', () => {
  let component: BasketUpdateComponent;
  let fixture: ComponentFixture<BasketUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
