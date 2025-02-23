import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApplicationFormComponent } from './card-application-form.component';

describe('CardApplicationFormComponent', () => {
  let component: CardApplicationFormComponent;
  let fixture: ComponentFixture<CardApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
