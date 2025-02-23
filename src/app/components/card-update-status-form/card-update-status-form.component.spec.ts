import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateStatusFormComponent } from './card-update-status-form.component';

describe('CardUpdateStatusFormComponent', () => {
  let component: CardUpdateStatusFormComponent;
  let fixture: ComponentFixture<CardUpdateStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateStatusFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
