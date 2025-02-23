import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnimalCreateComponent } from './dashboard-animal-create.component';

describe('DashboardAnimalCreateComponent', () => {
  let component: DashboardAnimalCreateComponent;
  let fixture: ComponentFixture<DashboardAnimalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnimalCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAnimalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
