import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfileEditComponent } from './card-profile-edit.component';

describe('CardProfileEditComponent', () => {
  let component: CardProfileEditComponent;
  let fixture: ComponentFixture<CardProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProfileEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
