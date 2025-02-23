import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateCoatColorFormComponent } from './card-create-coat-color-form.component';

describe('CardCreateCoatColorFormComponent', () => {
  let component: CardCreateCoatColorFormComponent;
  let fixture: ComponentFixture<CardCreateCoatColorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreateCoatColorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCreateCoatColorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
