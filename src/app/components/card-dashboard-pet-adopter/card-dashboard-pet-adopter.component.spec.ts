import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashboardPetAdopterComponent } from './card-dashboard-pet-adopter.component';

describe('CardDashboardPetAdopterComponent', () => {
  let component: CardDashboardPetAdopterComponent;
  let fixture: ComponentFixture<CardDashboardPetAdopterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDashboardPetAdopterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDashboardPetAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
