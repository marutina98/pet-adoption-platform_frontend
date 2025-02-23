import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPetAdopterComponent } from './registration-pet-adopter.component';

describe('RegistrationPetAdopterComponent', () => {
  let component: RegistrationPetAdopterComponent;
  let fixture: ComponentFixture<RegistrationPetAdopterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPetAdopterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPetAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
