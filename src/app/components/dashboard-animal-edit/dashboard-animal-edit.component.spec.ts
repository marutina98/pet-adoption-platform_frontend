import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnimalEditComponent } from './dashboard-animal-edit.component';

describe('DashboardAnimalEditComponent', () => {
  let component: DashboardAnimalEditComponent;
  let fixture: ComponentFixture<DashboardAnimalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnimalEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAnimalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
