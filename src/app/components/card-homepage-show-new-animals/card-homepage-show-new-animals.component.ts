import { Component, Input, inject } from '@angular/core';

import { Animal } from '../../interfaces/animal';
import { BridgeApiService } from '../../services/api/bridge-api.service';

import { CardAnimalComponent } from '../card-animal/card-animal.component';

const components = [CardAnimalComponent];

@Component({
  selector: 'app-card-homepage-show-new-animals',
  standalone: true,
  imports: [...components],
  templateUrl: './card-homepage-show-new-animals.component.html',
  styleUrl: './card-homepage-show-new-animals.component.css'
})
export class CardHomepageShowNewAnimalsComponent {

  @Input() animals: Animal[] = [];

  private bridgeApiService: BridgeApiService = inject(BridgeApiService);
  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

}
