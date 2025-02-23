import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomepageShowNewAnimalsComponent } from './card-homepage-show-new-animals.component';

describe('CardHomepageShowNewAnimalsComponent', () => {
  let component: CardHomepageShowNewAnimalsComponent;
  let fixture: ComponentFixture<CardHomepageShowNewAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHomepageShowNewAnimalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardHomepageShowNewAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
