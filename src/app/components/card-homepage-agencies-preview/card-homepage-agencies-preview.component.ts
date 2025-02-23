import { Component, Input } from '@angular/core';
import { CardUserComponent } from '../card-user/card-user.component';

import { PetAgency } from '../../interfaces/pet-agency';

const components = [CardUserComponent];

@Component({
  selector: 'app-card-homepage-agencies-preview',
  standalone: true,
  imports: [...components],
  templateUrl: './card-homepage-agencies-preview.component.html',
  styleUrl: './card-homepage-agencies-preview.component.css'
})
export class CardHomepageAgenciesPreviewComponent {

  @Input() agencies: PetAgency[] = [];

  public imageHeight: string = '250px';

}
