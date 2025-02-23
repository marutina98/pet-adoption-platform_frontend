import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReviewComponent } from './card-review.component';

describe('CardReviewComponent', () => {
  let component: CardReviewComponent;
  let fixture: ComponentFixture<CardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
