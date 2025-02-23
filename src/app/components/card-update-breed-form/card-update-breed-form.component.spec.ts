import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateBreedFormComponent } from './card-update-breed-form.component';

describe('CardUpdateBreedFormComponent', () => {
  let component: CardUpdateBreedFormComponent;
  let fixture: ComponentFixture<CardUpdateBreedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateBreedFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateBreedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
