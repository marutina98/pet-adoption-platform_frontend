import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAgenciesComponent } from './browse-agencies.component';

describe('BrowseAgenciesComponent', () => {
  let component: BrowseAgenciesComponent;
  let fixture: ComponentFixture<BrowseAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseAgenciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
