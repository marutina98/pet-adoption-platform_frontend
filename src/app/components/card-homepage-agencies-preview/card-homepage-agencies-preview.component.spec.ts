import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHomepageAgenciesPreviewComponent } from './card-homepage-agencies-preview.component';

describe('CardHomepageAgenciesPreviewComponent', () => {
  let component: CardHomepageAgenciesPreviewComponent;
  let fixture: ComponentFixture<CardHomepageAgenciesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHomepageAgenciesPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardHomepageAgenciesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
