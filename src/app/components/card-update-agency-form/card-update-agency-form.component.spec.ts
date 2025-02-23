import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUpdateAgencyFormComponent } from './card-update-agency-form.component';

describe('CardUpdateAgencyFormComponent', () => {
  let component: CardUpdateAgencyFormComponent;
  let fixture: ComponentFixture<CardUpdateAgencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUpdateAgencyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardUpdateAgencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
