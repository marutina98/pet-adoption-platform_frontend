import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interfaces

import { User } from './../../interfaces/user';
import { Application } from './../../interfaces/application';

// Services

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

@Component({
  selector: 'app-card-application',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-application.component.html',
  styleUrl: './card-application.component.css'
})
export class CardApplicationComponent {

  @Input() applicationsBK: Application[] = [];
  @Input() authenticatedUser: User|null = null;

  // Services

  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;
  public statuses: string[] = ['Pending Review', 'Accepted', 'Refused'];

  public applications: Application[] = [];

  ngOnInit() {
    this.applications = this.applicationsBK;
  }

  // Application

  async acceptApplication(id: number) {
    const response = await this.dataService.acceptApplication(id);
    const data = await response.json();
    const updated = this.updateAuthenticatedUser();

    console.log('accept');

    console.log(updated);

    console.log(data);

  }

  async refuseApplication(id: number) {
    const response = await this.dataService.refuseApplication(id);
    const data = await response.json();
    const updated = this.updateAuthenticatedUser();

    console.log('refuse');

    console.log(updated);

    console.log(data);

  }

  getStatus(id: number) {
    return this.statuses[id - 1];
  }

  async updateAuthenticatedUser() {
    const response = await this.authService.getAuthenticatedUser();
    const authenticatedUser = await response.json();
    if (authenticatedUser) {
      this.authService.authenticatedUserBehaviorSubject.next(authenticatedUser);
      this.applicationsBK = authenticatedUser.pet_agency.received_applications;
      this.applications = authenticatedUser.pet_agency.received_applications;
    }
    this.resetApplications();
  }

  filterApplications(id: number) {
    this.applications = this.applicationsBK.filter((a) => a.application_status_id === id);
  }

  resetApplications() {
    this.applications = this.applicationsBK;
  }

}
