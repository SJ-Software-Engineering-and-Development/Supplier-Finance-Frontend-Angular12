import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSlideBarComponent } from './buyer-slide-bar.component';

describe('BuyerSlideBarComponent', () => {
  let component: BuyerSlideBarComponent;
  let fixture: ComponentFixture<BuyerSlideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSlideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerSlideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
