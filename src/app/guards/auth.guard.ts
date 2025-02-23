import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { DataService } from './../services/data.service';

export const isAuthenticatedUserGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).checkTokenCookie();
};

export const isGuestUserGuard: CanActivateFn = (route, state) => {
  return !(inject(AuthService).checkTokenCookie());
};

export const isAdministrator: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const responseAuthenticatedUser = await authService.getAuthenticatedUser();
  const authenticatedUser = await responseAuthenticatedUser.json();
  return authenticatedUser.is_administrator === 1;
};

export const isPetAgency: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const responseAuthenticatedUser = await authService.getAuthenticatedUser();
  const authenticatedUser = await responseAuthenticatedUser.json();
  return authenticatedUser.is_pet_agency === 1;
};

/* Error: NG0203: inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with `runInInjectionContext`. */

export const isAnimalAuthor: CanActivateFn = async (route, state) => {

  // services

  const authService: AuthService = inject(AuthService);
  const dataService: DataService = inject(DataService);

  // get id and make it a number

  const id = Number(route.paramMap.get('id')) ?? 0;

  // get authenticated user

  const responseAuthenticatedUser = await authService.getAuthenticatedUser();
  const authenticatedUser = await responseAuthenticatedUser.json();

  // get animal

  const responseAnimal = await dataService.getAnimal(id);
  const animal = await responseAnimal.json();

  // check that the authenticated user is a pet agency

  const isPetAgency = authenticatedUser.is_pet_agency === 1;

  // if the user is not a pet agency return false

  if (isPetAgency) {
    return authenticatedUser.pet_agency.id === animal.pet_agency_id;
  }

  return false;

};
