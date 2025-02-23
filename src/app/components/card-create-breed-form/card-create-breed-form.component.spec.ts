import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateBreedFormComponent } from './card-create-breed-form.component';

describe('CardCreateBreedFormComponent', () => {
  let component: CardCreateBreedFormComponent;
  let fixture: ComponentFixture<CardCreateBreedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreateBreedFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCreateBreedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
