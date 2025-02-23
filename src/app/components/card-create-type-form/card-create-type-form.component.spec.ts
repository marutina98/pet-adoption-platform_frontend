import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateTypeFormComponent } from './card-create-type-form.component';

describe('CardCreateTypeFormComponent', () => {
  let component: CardCreateTypeFormComponent;
  let fixture: ComponentFixture<CardCreateTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreateTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCreateTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
