import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Interfaces

import { User } from './../../interfaces/user';
import { Animal } from './../../interfaces/animal';
import { PetAdopter } from './../../interfaces/pet-adopter';

// Services

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Components

import { CardReviewComponent } from './../card-review/card-review.component';
import { CardProfileComponent } from './../card-profile/card-profile.component';
import { CardApplicationComponent } from './../card-application/card-application.component';

const components = [CardReviewComponent, CardProfileComponent, CardApplicationComponent];

import { ReviewDialogComponent } from './../dialogs/review-dialog/review-dialog.component';
import { ConfirmationDialogComponent } from './../dialogs/confirmation-dialog/confirmation-dialog.component';

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule, NgbPaginationModule];

// Material

import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const material = [MatBadgeModule, MatDialogModule];

@Component({
  selector: 'app-card-dashboard-pet-agency',
  standalone: true,
  imports: [CommonModule, RouterLink, ...bootstrap, ...components, ...material],
  templateUrl: './card-dashboard-pet-agency.component.html',
  styleUrl: './card-dashboard-pet-agency.component.css'
})
export class CardDashboardPetAgencyComponent {

  // Input

  @Input() users: User[] = [];
  @Input() authenticatedUser: User|null = null;
  @Input() pendingReviews: PetAdopter[] = [];

  // Services

  private router: Router = inject(Router);
  private matDialog: MatDialog = inject(MatDialog);
  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public animals: Animal[] = [];
  public animalsBK: Animal[] = [];
  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  // Nav

  public activeTab: number = 1;

  // Pagination

  public currentPagePendingReviews: number = 1;
  public pageSizePendingReviews: number = 10;

  public currentPageAnimals: number = 1;
  public pageSizeAnimals: number = 10;

  async ngOnInit() {
    await this.getAnimalsByPetAgency();
  }

  openDashboardAnimalEditComponent(id: number) {
    this.router.navigate(['/dashboard/edit/animal', id]);
  }

  openConfirmationDialog(id: number) {
    
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (value) => {
      if (value) await this.deleteAnimal(id);
    });

  }

  openReviewDialog(adopter: PetAdopter) {

    const dialogRef = this.matDialog.open(ReviewDialogComponent, {
      data: { 'reviewee_id': adopter.user_id },
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.updateAuthenticatedUser();
      await this.updatePendingReviews();
    });

  }

  async deleteAnimal(id: number) {
    const response = await this.dataService.deleteAnimal(id);
    await this.getAnimalsByPetAgency();
  }

  filterAnimalsByStatus(id: number) {
    this.animals = this.animalsBK.filter(a => a.status_id === id);
  }

  resetAnimals() {
    this.animals = this.animalsBK;
  }

  async getAnimalsByPetAgency() {
    const response = await this.dataService.getAnimalsByPetAgency(this.authenticatedUser!.pet_agency!.id);

    if (response.ok) {
      this.animalsBK = await response.json();
      this.animals = this.animalsBK;
    }

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
