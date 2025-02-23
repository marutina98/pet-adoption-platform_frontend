import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateStatusFormComponent } from './card-create-status-form.component';

describe('CardCreateStatusFormComponent', () => {
  let component: CardCreateStatusFormComponent;
  let fixture: ComponentFixture<CardCreateStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreateStatusFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCreateStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
