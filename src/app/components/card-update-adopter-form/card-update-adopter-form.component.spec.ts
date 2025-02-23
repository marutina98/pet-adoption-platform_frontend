import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateAdopterFormComponent } from './card-update-adopter-form.component';

describe('CardUpdateAdopterFormComponent', () => {
  let component: CardUpdateAdopterFormComponent;
  let fixture: ComponentFixture<CardUpdateAdopterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateAdopterFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateAdopterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
