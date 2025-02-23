import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interfaces

import { Animal } from './../../interfaces/animal';
import { Status } from './../../interfaces/status';

// Services

import { DataService } from './../../services/data.service';
import { HelperService } from './../../services/helper.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Bootstrap

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbCarouselModule];

@Component({
  selector: 'app-card-animal',
  standalone: true,
  imports: [RouterLink, CommonModule, bootstrap],
  templateUrl: './card-animal.component.html',
  styleUrl: './card-animal.component.css'
})
export class CardAnimalComponent {

  // Input

  @Input() animal: Animal = {} as Animal;
  @Input() carousel: boolean = false;
  @Input() status: Status|null = null;
  @Input() singlePage: boolean = false;
  @Input() imageHeight: string = '100%';

  // Services

  private dataService: DataService = inject(DataService);
  private helperService: HelperService = inject(HelperService);
  private bridgeAPI: BridgeApiService = inject(BridgeApiService);

  // Images
  
  public images: string[] = [];
  public storageURL: string = this.bridgeAPI.chosenAPI.storageURL;

  async ngOnInit() {

    // if status is null (aka not preloaded)
    // get status by id 

    if (!this.status) {

      const response = await this.dataService.getStatusById(this.animal.status_id);
      if (response.ok) this.status = await response.json();

    }

  }

  getAgeLabelFromString(birthdate: string): string {
    return this.helperService.getAgeLabelFromString(birthdate);
  }

}
