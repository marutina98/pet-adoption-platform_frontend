import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAnimalsComponent } from './browse-animals.component';

describe('BrowseAnimalsComponent', () => {
  let component: BrowseAnimalsComponent;
  let fixture: ComponentFixture<BrowseAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseAnimalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
