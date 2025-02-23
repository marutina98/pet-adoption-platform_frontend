import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// Interfaces

import { User } from './../../../interfaces/user';
import { Animal } from './../../../interfaces/animal';
import { Status } from './../../../interfaces/status';
import { PetAgency } from './../../../interfaces/pet-agency';
import { PetAdopter } from './../../../interfaces/pet-adopter';

// Services

import { AuthService } from './../../../services/auth.service';
import { DataService } from './../../../services/data.service';
import { BridgeApiService } from './../../../services/api/bridge-api.service';

// Components

import { CardUserComponent } from './../../card-user/card-user.component';
import { CardAnimalComponent } from './../../card-animal/card-animal.component';
import { CardApplicationFormComponent } from './../../card-application-form/card-application-form.component';

const components = [CardUserComponent, CardAnimalComponent, CardApplicationFormComponent];

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule];

@Component({
  selector: 'app-view-animal',
  standalone: true,
  imports: [CommonModule, ...components, ...bootstrap],
  templateUrl: './view-animal.component.html',
  styleUrl: './view-animal.component.css'
})
export class ViewAnimalComponent {

  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private bridgeAPI: BridgeApiService = inject(BridgeApiService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public animal: Animal|null = null;
  public status: Status = {} as Status;

  public petAgency: PetAgency|null = null;
  public petAdopter: PetAdopter|null = null;

  public isAuthenticated: Boolean = false;
  public isAuthenticatedUserPetAdopter: Boolean = false;
  public authenticatedUser: User|null = null;

  private storageURL: string = this.bridgeAPI.chosenAPI.storageURL;

  public activeTab: number = 1;

  public imageHeight: string = '250px';

  async ngOnInit() {

    // subscribe to activatedUser and isAuthenticated

    this.authService.isAuthenticated.subscribe(status => this.isAuthenticated = status);
    this.authService.authenticatedUserBehaviorSubject.subscribe(user => this.authenticatedUser = user);

    // check if user is authenticated
    // check if authenticated user is a pet adopter

    this.authService.isAuthenticated.next(this.authService.checkTokenCookie());
    this.isAuthenticatedUserPetAdopter = this.authenticatedUser?.is_pet_adopter === 1;

    // Get Animal from Resolver
    
    const responseAnimal = await this.activatedRoute.snapshot.data['animal'];
    if (responseAnimal.ok) this.animal = await responseAnimal.json();

    // After Getting Animal from Resolver

    if (this.animal) {

      // Get Status

      const responseStatus = await this.dataService.getStatusById(this.animal.status_id);
      if (responseStatus.ok) this.status = await responseStatus.json();

      // Get Pet Agency

      const responsePetAgency = await this.dataService.getPetAgencyById(this.animal.pet_agency_id);
      if (responsePetAgency.ok) this.petAgency = await responsePetAgency.json();

      // Get Pet Adopter, if id is not null.

      const petAdopterId = this.animal.pet_adopter_id;

      if (petAdopterId) {
        const response = await this.dataService.getPetAdopterById(petAdopterId);
        if (response.ok) this.petAdopter = await response.json();
      }

    }

  }

}
