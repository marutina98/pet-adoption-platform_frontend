import { Component, inject } from '@angular/core';

import { CardHomepageShowNewAnimalsComponent } from '../../card-homepage-show-new-animals/card-homepage-show-new-animals.component';
import { CardHomepageAgenciesPreviewComponent } from '../../card-homepage-agencies-preview/card-homepage-agencies-preview.component';

import { ActivatedRoute } from '@angular/router';

import { PetAgency } from '../../../interfaces/pet-agency';
import { Animal } from '../../../interfaces/animal';
import { CarouselComponent } from '../../carousel/carousel.component';

const components = [CardHomepageAgenciesPreviewComponent, CardHomepageShowNewAnimalsComponent, CarouselComponent];

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [...components],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public agencies: PetAgency[] = [];
  public animals: Animal[] = [];

  async ngOnInit() {

    // Get the agencies to pass them to the agenciesPreview component
    // Get only the first 5

    const responseAgencies = await this.activatedRoute.snapshot.data['agencies'];

    if (responseAgencies.ok) {
      const agencies = await responseAgencies.json();
      this.agencies = agencies.slice(0, 5);
    }

    // Get the animals, pass them to the showNewAnimals component
    // Get the last 5

    const responseAnimals = await this.activatedRoute.snapshot.data['animals'];

    if (responseAnimals.ok) {
      const animals = await responseAnimals.json();
      this.animals = animals.slice(-5);
    }

  }

}
