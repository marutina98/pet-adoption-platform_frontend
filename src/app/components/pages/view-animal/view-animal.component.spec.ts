import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnimalComponent } from './view-animal.component';

describe('ViewAnimalComponent', () => {
  let component: ViewAnimalComponent;
  let fixture: ComponentFixture<ViewAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAnimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
