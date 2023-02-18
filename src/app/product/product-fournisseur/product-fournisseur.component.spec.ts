import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFournisseurComponent } from './product-fournisseur.component';

describe('ProductFournisseurComponent', () => {
  let component: ProductFournisseurComponent;
  let fixture: ComponentFixture<ProductFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
