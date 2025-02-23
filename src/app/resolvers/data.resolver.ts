import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { DataService } from './../services/data.service';

// Types

export const getTypes: ResolveFn<any> = (route, state) => {
  return inject(DataService).getTypes();
};

// Users

export const getAuthenticatedUser: ResolveFn<any> = (route, state) => {
  return inject(AuthService).getAuthenticatedUser();
};

export const getUsers: ResolveFn<any> = (route, state) => {
  return inject(DataService).getUsers();
};

export const getPetAgencies: ResolveFn<any> = (route, state) => {
  return inject(DataService).getPetAgencies();
};

export const getPetAdopters: ResolveFn<any> = (route, state) => {
  return inject(DataService).getPetAdopters();
};

export const getPetAgencyById: ResolveFn<any> = (route, state) => {
  return inject(DataService).getPetAgencyById(route.params['id']);
};

export const getPetAdopterById: ResolveFn<any> = (route, state) => {
  return inject(DataService).getPetAdopterById(route.params['id']);
};

// Animals

export const getAnimal: ResolveFn<any> = (route, state) => {
  return inject(DataService).getAnimal(route.params['id']);
};

export const getAnimals: ResolveFn<any> = (route, state) => {
  return inject(DataService).getAnimals();
};

export const getAnimalsByTypeResolver: ResolveFn<any> = (route, state) => {
  return inject(DataService).getAnimalsByType(route.params['type']);
};

export const getAnimalBreeds: ResolveFn<any> = (route, state) => {
  return inject(DataService).getAnimalBreeds();
};

export const getAnimalBreedsByTypeResolver: ResolveFn<any> = (route, state) => {
  return inject(DataService).getAnimalBreedsByType(route.params['type']);
};

export const getAnimalBreedsByActiveAnimalTypeIdResolver: ResolveFn<any> = async (route, state) => {

  // services

  const dataService: DataService = inject(DataService);

  // get animal id

  const animalId: number = Number(route.params['id']) ?? 0;

  // get animal

  const responseAnimal = await dataService.getAnimal(animalId);
  const animal = await responseAnimal.json();

  // get type

  const types: string[] = ['dogs', 'cats', 'rabbits'];
  const type = types[types.indexOf(animal.animal_type_id) + 1];

  // return breeds

  return dataService.getAnimalBreedsByType(type);

};

export const getAnimalCoatColorsResolver: ResolveFn<any> = (route, state) => {
  return inject(DataService).getAnimalCoatColors();
};

// Status

export const getStatuses: ResolveFn<any> = (route, state) => {
  return inject(DataService).getStatuses();
};

export const getPendingReviews: ResolveFn<any> = async (route, state) => {
  const authService = inject(AuthService);
  const dataService = inject(DataService);
  const responseAuthenticatedUser = await authService.getAuthenticatedUser();
  const authenticatedUser = await responseAuthenticatedUser.json();
  return authenticatedUser.is_administrator != 1 ? dataService.getPendingReviews() : [];
};
