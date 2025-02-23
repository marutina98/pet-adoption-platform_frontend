import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// Interfaces

import { Status } from './../../../interfaces/status';
import { PetAgency } from './../../../interfaces/pet-agency';

// Services

// Components

import { CardUserComponent } from './../../card-user/card-user.component';
import { CardAnimalComponent } from './../../card-animal/card-animal.component';

const components = [CardUserComponent, CardAnimalComponent];

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule, NgbPaginationModule];

@Component({
  selector: 'app-view-agency',
  standalone: true,
  imports: [CommonModule, ...components, ...bootstrap],
  templateUrl: './view-agency.component.html',
  styleUrl: './view-agency.component.css'
})
export class ViewAgencyComponent {

  // Services

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Data

  public agency: PetAgency|null = null;
  public statuses: Status[] = [];

  // Nav

  public activeTab: number = 1;

  // Components

  public cardUserImageHeight: string = '300px';
  public cardAnimalImageHeight: string = '300px';

  // Pagination

  public currentPage: number = 1;
  public pageSize: number = 10;

  // Init

  async ngOnInit() {

    // Get PetAgency and Statuses

    const responseAgency = await this.activatedRoute.snapshot.data['agency'];
    if (responseAgency.ok) this.agency = await responseAgency.json();

    console.log(this.agency);

    const responseStatuses = await this.activatedRoute.snapshot.data['statuses'];
    if (responseStatuses.ok) this.statuses = await responseStatuses.json();

  }

  getStatus(id: number): Status {
    return this.statuses.find((status) => status.id === id) || {} as Status;
  }

}
