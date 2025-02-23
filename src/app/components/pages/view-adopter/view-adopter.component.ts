import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PetAdopter } from './../../../interfaces/pet-adopter';

// Components

import { CardUserComponent } from './../../card-user/card-user.component';

const components = [CardUserComponent];

@Component({
  selector: 'app-view-adopter',
  standalone: true,
  imports: [...components],
  templateUrl: './view-adopter.component.html',
  styleUrl: './view-adopter.component.css'
})
export class ViewAdopterComponent {

  // Services

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Data

  public adopter: PetAdopter|null = null;
  public cardUserImageHeight: string = '300px';

  async ngOnInit() {

    // get adopter profile

    const responseAdopter = await this.activatedRoute.snapshot.data['adopter'];
    if (responseAdopter.ok) this.adopter = await responseAdopter.json();

  }

}
