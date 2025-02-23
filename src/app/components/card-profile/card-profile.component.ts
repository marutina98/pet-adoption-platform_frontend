import { Component, Input, ElementRef, inject } from '@angular/core';

// Interfaces

import { User } from './../../interfaces/user';
import { Profile } from './../../interfaces/profile';

// Services

import { AuthService } from './../../services/auth.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Components

import { CardProfileEditComponent } from './../card-profile-edit/card-profile-edit.component';

const components = [CardProfileEditComponent];

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule];

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [...components, ...bootstrap],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.css'
})
export class CardProfileComponent {

  // Input

  @Input() authenticatedUser: User|null = null;

  // Services

  private bridgeApiService: BridgeApiService = inject(BridgeApiService);
  private authService: AuthService = inject(AuthService);

  // StorageURL

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  // Nav

  public activeTab: number = 1;

  // Profile

  public profile: Profile = {
    email: '',
    name: '',
    phone: '',
    address: '',
    picture: this.storageURL,
  }

  ngOnInit() {
    this.initProfile();
  }

  initProfile() {

    this.profile.email = this.authenticatedUser?.email ?? '';

    if (this.authenticatedUser?.is_pet_agency) {
      this.profile.name = this.authenticatedUser.pet_agency?.name ?? '';
      this.profile.phone = this.authenticatedUser.pet_agency?.phone ?? '';
      this.profile.address = this.authenticatedUser.pet_agency?.address ?? '';
      this.profile.picture = this.storageURL + this.authenticatedUser.pet_agency?.picture;
      this.profile.description = this.authenticatedUser.pet_agency?.description ?? '';
      this.profile.website = this.authenticatedUser.pet_agency?.website ?? '';
    }

    if (this.authenticatedUser?.is_pet_adopter) {
      this.profile.name = this.authenticatedUser.pet_adopter?.name ?? '';
      this.profile.phone = this.authenticatedUser.pet_adopter?.phone ?? '';
      this.profile.address = this.authenticatedUser.pet_adopter?.address ?? '';
      this.profile.picture = this.storageURL + this.authenticatedUser.pet_adopter?.picture;
    }

  }

}
