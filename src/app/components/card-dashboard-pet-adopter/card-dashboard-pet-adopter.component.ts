import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Interfaces

import { User } from './../../interfaces/user';
import { PetAgency } from './../../interfaces/pet-agency';

// Services

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Components

import { CardReviewComponent } from './../card-review/card-review.component';
import { CardProfileComponent } from './../card-profile/card-profile.component';
import { CardApplicationComponent } from './../card-application/card-application.component';

import { ReviewDialogComponent } from './../dialogs/review-dialog/review-dialog.component';

const components = [CardReviewComponent, CardProfileComponent, CardApplicationComponent];

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule, NgbPaginationModule];

// Material

import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const material = [MatBadgeModule, MatDialogModule];

@Component({
  selector: 'app-card-dashboard-pet-adopter',
  standalone: true,
  imports: [CommonModule, RouterLink, ...bootstrap, ...material, ...components],
  templateUrl: './card-dashboard-pet-adopter.component.html',
  styleUrl: './card-dashboard-pet-adopter.component.css'
})
export class CardDashboardPetAdopterComponent {

  // Input

  @Input() users: User[] = [];
  @Input() authenticatedUser: User|null = null;
  @Input() pendingReviews: PetAgency[] = [];

  public activeTab: number = 1;
  public applicationStatuses: string[] = ['Pending Review', 'Accepted', 'Refused'];

  // Services

  private router: Router = inject(Router);
  private matDialog: MatDialog = inject(MatDialog);
  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  // Pagination

  public currentPagePendingReviews: number = 1;
  public pageSizePendingReviews: number = 10;

  // Pending Reviews  

  openReviewDialog(agency: PetAgency) {
    const dialogRef = this.matDialog.open(ReviewDialogComponent, {
      data: { 'reviewee_id': agency.user_id },
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.updateAuthenticatedUser();
      await this.updatePendingReviews();
    });
  }

  async updateAuthenticatedUser() {
    const responseAuthenticatedUser = await this.authService.getAuthenticatedUser();
    const authenticatedUser = await responseAuthenticatedUser.json();
    this.authService.authenticatedUserBehaviorSubject.next(authenticatedUser);
    this.authenticatedUser = authenticatedUser;
  }

  async updatePendingReviews() {
    const response = await this.dataService.getPendingReviews();
    this.pendingReviews = await response.json();
  }

}
