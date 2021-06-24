import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceSellerComponent } from './view-invoice-seller.component';

describe('ViewInvoiceSellerComponent', () => {
  let component: ViewInvoiceSellerComponent;
  let fixture: ComponentFixture<ViewInvoiceSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvoiceSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInvoiceSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
