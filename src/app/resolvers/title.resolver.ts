import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { DataService } from './../services/data.service';

export const getAnimalTitle: ResolveFn<string> = async (route, state) => {
  
  const dataService = inject(DataService);

  const responseAnimal = await dataService.getAnimal(route.params['id']);
  const animal = await responseAnimal.json();

  const animalName = animal.name;
  const websiteName = 'Paws and Whiskers';

  return `${animalName} - ${websiteName}`;

};

export const getPetAgencyTitle: ResolveFn<string> = async (route, state) => {
  
  const dataService = inject(DataService);

  const responseAgency = await dataService.getPetAgencyById(route.params['id']);
  const agency = await responseAgency.json();

  const agencyName = agency.name;
  const websiteName = 'Paws and Whiskers';

  return `View Agency: ${agencyName} - ${websiteName}`;

};

export const getPetAdopterTitle: ResolveFn<string> = async (route, state) => {
  
  const dataService = inject(DataService);

  const responseAdopter = await dataService.getPetAdopterById(route.params['id']);
  const adopter = await responseAdopter.json();

  const adopterName = adopter.name;
  const websiteName = 'Paws and Whiskers';

  return `View Agency: ${adopterName} - ${websiteName}`;

};
