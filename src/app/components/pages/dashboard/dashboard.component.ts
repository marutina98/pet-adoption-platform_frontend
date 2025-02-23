import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Interfaces

import { User } from './../../../interfaces/user';

// Services

import { AuthService } from './../../../services/auth.service';
import { DataService } from './../../../services/data.service';

// Components

import { CardDashboardPetAgencyComponent } from './../../card-dashboard-pet-agency/card-dashboard-pet-agency.component';
import { CardDashboardPetAdopterComponent } from './../../card-dashboard-pet-adopter/card-dashboard-pet-adopter.component';
import { CardDashboardAdministratorComponent } from './../../card-dashboard-administrator/card-dashboard-administrator.component';

const components = [CardDashboardPetAgencyComponent, CardDashboardPetAdopterComponent, CardDashboardAdministratorComponent];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...components],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // Services

  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public users: User[] = [];
  public authenticatedUser: User|null = null;

  public pendingReviews: any = [];

  async ngOnInit() {

    // subscribe to authenticatedUser

    this.authService.authenticatedUserBehaviorSubject.subscribe(user => this.authenticatedUser = user);

    // get users

    const responseUsers = await this.activatedRoute.snapshot.data['users'];
    if (responseUsers.ok) this.users = await responseUsers.json();

    if (this.authenticatedUser?.is_administrator != 1) {

      // get pending reviews - pet adopters or pet agencies

      const responsePendingReviews = await this.activatedRoute.snapshot.data['pendingReviews'];
      if (responsePendingReviews.ok) this.pendingReviews = await responsePendingReviews.json();

    }

  }

}
