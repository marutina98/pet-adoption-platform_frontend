import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateCoatColorFormComponent } from './card-update-coat-color-form.component';

describe('CardUpdateCoatColorFormComponent', () => {
  let component: CardUpdateCoatColorFormComponent;
  let fixture: ComponentFixture<CardUpdateCoatColorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateCoatColorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateCoatColorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
