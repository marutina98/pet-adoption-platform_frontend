import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPetAgencyComponent } from './registration-pet-agency.component';

describe('RegistrationPetAgencyComponent', () => {
  let component: RegistrationPetAgencyComponent;
  let fixture: ComponentFixture<RegistrationPetAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPetAgencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPetAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
