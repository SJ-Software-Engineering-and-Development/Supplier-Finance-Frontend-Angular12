import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerSlideBarComponent } from './banker-slide-bar.component';

describe('BankerSlideBarComponent', () => {
  let component: BankerSlideBarComponent;
  let fixture: ComponentFixture<BankerSlideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankerSlideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankerSlideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
