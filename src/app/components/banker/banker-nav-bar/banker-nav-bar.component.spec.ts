import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerNavBarComponent } from './banker-nav-bar.component';

describe('BankerNavBarComponent', () => {
  let component: BankerNavBarComponent;
  let fixture: ComponentFixture<BankerNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankerNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankerNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
