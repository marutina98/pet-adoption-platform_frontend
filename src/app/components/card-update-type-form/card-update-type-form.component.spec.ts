import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateTypeFormComponent } from './card-update-type-form.component';

describe('CardUpdateTypeFormComponent', () => {
  let component: CardUpdateTypeFormComponent;
  let fixture: ComponentFixture<CardUpdateTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
