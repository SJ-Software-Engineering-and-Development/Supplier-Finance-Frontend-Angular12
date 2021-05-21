import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSlideBarComponent } from './seller-slide-bar.component';

describe('SellerSlideBarComponent', () => {
  let component: SellerSlideBarComponent;
  let fixture: ComponentFixture<SellerSlideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerSlideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSlideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
