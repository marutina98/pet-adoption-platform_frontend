import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApplicationComponent } from './card-application.component';

describe('CardApplicationComponent', () => {
  let component: CardApplicationComponent;
  let fixture: ComponentFixture<CardApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
