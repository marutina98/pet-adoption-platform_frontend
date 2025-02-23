import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardAdministratorComponent } from './card-dashboard-administrator.component';

describe('CardDashboardAdministratorComponent', () => {
  let component: CardDashboardAdministratorComponent;
  let fixture: ComponentFixture<CardDashboardAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDashboardAdministratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDashboardAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
