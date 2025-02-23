import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPicturesComponent } from './card-pictures.component';

describe('CardPicturesComponent', () => {
  let component: CardPicturesComponent;
  let fixture: ComponentFixture<CardPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPicturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
