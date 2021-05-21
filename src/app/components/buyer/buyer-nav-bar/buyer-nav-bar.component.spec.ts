import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerNavBarComponent } from './buyer-nav-bar.component';

describe('BuyerNavBarComponent', () => {
  let component: BuyerNavBarComponent;
  let fixture: ComponentFixture<BuyerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
