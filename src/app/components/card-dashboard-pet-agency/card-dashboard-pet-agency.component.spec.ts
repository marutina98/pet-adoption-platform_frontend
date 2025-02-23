import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardPetAgencyComponent } from './card-dashboard-pet-agency.component';

describe('CardDashboardPetAgencyComponent', () => {
  let component: CardDashboardPetAgencyComponent;
  let fixture: ComponentFixture<CardDashboardPetAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDashboardPetAgencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDashboardPetAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
