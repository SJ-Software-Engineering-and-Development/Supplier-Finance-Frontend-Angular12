import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerNavBarComponent } from './seller-nav-bar.component';

describe('SellerNavBarComponent', () => {
  let component: SellerNavBarComponent;
  let fixture: ComponentFixture<SellerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
