import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerDashboardComponent } from './banker-dashboard.component';

describe('BankerDashboardComponent', () => {
  let component: BankerDashboardComponent;
  let fixture: ComponentFixture<BankerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
