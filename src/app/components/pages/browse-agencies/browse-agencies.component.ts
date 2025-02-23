import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// Interfaces

import { PetAgency } from './../../../interfaces/pet-agency';

// Services

import { DataService } from './../../../services/data.service';

// Components

import { CardUserComponent } from './../../card-user/card-user.component';

const components = [CardUserComponent];

// Bootstrap

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbPaginationModule];

@Component({
  selector: 'app-browse-agencies',
  standalone: true,
  imports: [CommonModule, ...components, ...bootstrap],
  templateUrl: './browse-agencies.component.html',
  styleUrl: './browse-agencies.component.css'
})
export class BrowseAgenciesComponent {

  // Services

  private dataService: DataService = inject(DataService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Data

  public agencies: PetAgency[] = [];

  // Configuration: CardUserComponent

  public imageHeight: string = '200px';

  // Configuration: Pagination

  public currentPage: number = 1;
  public pageSize: number = 10;

  async ngOnInit() {

    // Get Pet Agencies from Resolver

    const responseAgencies = await this.activatedRoute.snapshot.data['agencies'];
    if (responseAgencies.ok) this.agencies = await responseAgencies.json();

  }

}
