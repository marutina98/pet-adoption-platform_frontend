import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateAnimalFormComponent } from './card-update-animal-form.component';

describe('CardUpdateAnimalFormComponent', () => {
  let component: CardUpdateAnimalFormComponent;
  let fixture: ComponentFixture<CardUpdateAnimalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateAnimalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateAnimalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
