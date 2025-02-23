import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateUserFormComponent } from './card-create-user-form.component';

describe('CardCreateUserFormComponent', () => {
  let component: CardCreateUserFormComponent;
  let fixture: ComponentFixture<CardCreateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreateUserFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
