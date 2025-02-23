import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdopterComponent } from './view-adopter.component';

describe('ViewAdopterComponent', () => {
  let component: ViewAdopterComponent;
  let fixture: ComponentFixture<ViewAdopterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdopterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAdopterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
