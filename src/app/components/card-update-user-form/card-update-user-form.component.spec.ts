import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateUserFormComponent } from './card-update-user-form.component';

describe('CardUpdateUserFormComponent', () => {
  let component: CardUpdateUserFormComponent;
  let fixture: ComponentFixture<CardUpdateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateUserFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
