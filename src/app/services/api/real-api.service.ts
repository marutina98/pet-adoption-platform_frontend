import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// Interfaces

import { LoginRequestBody } from './../../interfaces/api/login-request-body';
import { ApplicationRequestBody } from './../../interfaces/api/application-request-body';
import { RegistrationRequestBody } from './../../interfaces/api/registration-request-body';
import { ReviewRequestBody } from './../../interfaces/review-request-body';

@Injectable({
  providedIn: 'root'
})
export class RealApiService {

  public storageURL: string = 'http://localhost:8000/';

  private cookie: CookieService = inject(CookieService);
  private baseURL: string = 'http://localhost:8000/api/';

  // Get Config for Request

  getConfig(method: string, body: any = null, formData: FormData|null = null) {

    const headers = [
      ['Accept', 'application/json'],
      ['Access-Control-Allow-Origin', '*'],
      ['Access-Control-Allow-Credentials', true],
    ];

    const config: [[string, string|FormData]] = [['method', method]];

    if (body) config.push(['body', JSON.stringify(body)]);

    if (formData) {
      config.push(['body', formData])
    } else {
      headers.push(['Content-Type', 'application/json']);
    }

    // check if the token cookie exists
    // if authenticated add the token in the headers
    
    const isAuthenticated = this.cookie.check('token');

    if (isAuthenticated) {
      const token = this.cookie.get('token');
      headers.push(['Authorization', 'Bearer ' + token]);
    }

    // add headers in config and return config as object

    config.push(['headers', Object.fromEntries(headers)]);
    return Object.fromEntries(config);

  }

  // Authentication

  authenticate(body: LoginRequestBody) {
    const route: string = this.baseURL + 'authentication';
    return fetch(route, this.getConfig('POST', body));
  }

  registratePetAdopter(body: RegistrationRequestBody) {
    const route: string = this.baseURL + 'registration/adopter';
    return fetch(route, this.getConfig('POST', body));
  }

  registratePetAgency(body: RegistrationRequestBody) {
    const route: string = this.baseURL + 'registration/agency';
    return fetch(route, this.getConfig('POST', body));
  }

  logout() {
    const route: string = this.baseURL + 'logout';
    return fetch(route, this.getConfig('GET'));
  }

  // Application

  addApplication(animalId: number, body: ApplicationRequestBody) {
    const route: string = this.baseURL + 'application/' + animalId;
    return fetch(route, this.getConfig('POST', body));
  }

  acceptApplication(id: number) {
    const route: string = this.baseURL + 'application/' + id;
    return fetch(route, this.getConfig('PUT', {
      'application_status_id': 2
    }));
  }

  refuseApplication(id: number) {
    const route: string = this.baseURL + 'application/' + id;
    return fetch(route, this.getConfig('PUT', {
      'application_status_id': 3
    }));
  }

  // Users

  getAuthenticatedUser() {
    const route: string = this.baseURL + 'authenticated-user';
    return fetch(route, this.getConfig('GET'));
  }

  getUsers() {
    const route: string = this.baseURL + 'user';
    return fetch(route, this.getConfig('GET'));
  }

  getPetAgencies() {
    const route: string = this.baseURL + 'agency';
    return fetch(route, this.getConfig('GET'));
  }

  getPetAgencyById(id: number) {
    const route: string = this.baseURL + 'agency/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  getPetAdopterById(id: number) {
    const route: string = this.baseURL + 'adopter/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  getPetAdopters() {
    const route: string = this.baseURL + 'adopter';
    return fetch(route, this.getConfig('GET'));
  }

  storePetAgencyProfile(formData: FormData) {
    const route: string = this.baseURL + 'agency';
    return fetch(route, this.getConfig('POST', null, formData));
  }

  storePetAdopterProfile(formData: FormData) {
    const route: string = this.baseURL + 'adopter';
    return fetch(route, this.getConfig('POST', null, formData));
  }

  // Data

  getAnimal(id: number) {
    const route = this.baseURL + 'animal/id/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  getAnimals() {
    const route = this.baseURL + 'animal';
    return fetch(route, this.getConfig('GET'));
  }

  getAnimalsByType(type: string) {
    const types: string[] = ['dogs', 'cats', 'rabbits'];
    const id = types.indexOf(type) + 1;
    const route = this.baseURL + 'type/' + id + '/animals';
    return fetch(route, this.getConfig('GET'));
  }

  getAnimalCoatColors() {
    const route = this.baseURL + 'coat';
    return fetch(route, this.getConfig('GET'));
  }

  getAnimalBreeds() {
    const route = this.baseURL + 'breed';
    return fetch(route, this.getConfig('GET'));
  }

  getAnimalBreedsByType(type: string) {
    const types: string[] = ['dogs', 'cats', 'rabbits'];
    const id = types.indexOf(type) + 1;
    const route = this.baseURL + 'type/' + id + '/breeds';
    return fetch(route, this.getConfig('GET'));
  }

  getAnimalsByPetAgency(id: number) {
    const route = this.baseURL + 'animal/agency/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  createAnimal(formData: FormData) {
    const route = this.baseURL + 'animal';
    return fetch(route, this.getConfig('POST', null, formData));
  }

  updateAnimal(id: number, body: any) {
    const route = this.baseURL + 'animal/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  deleteAnimal(id: number) {
    const route = this.baseURL + 'animal/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  getAnimalPicturesByAnimalId(id: number) {
    const route = this.baseURL + 'picture/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  deleteAnimalPicture(id: number) {
    const route = this.baseURL + 'picture/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  // Type

  getTypes() {
    const route = this.baseURL + 'type';
    return fetch(route, this.getConfig('GET'));
  }

  getTypeById(id: number) {
    const route = this.baseURL + 'type/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  // Status

  getStatusById(id: number) {
    const route = this.baseURL + 'status/' + id;
    return fetch(route, this.getConfig('GET'));
  }

  getStatuses() {
    const route = this.baseURL + 'status';
    return fetch(route, this.getConfig('GET'));
  }

  // Review

  leaveReview(body: ReviewRequestBody) {
    const route = this.baseURL + 'review';
    return fetch(route, this.getConfig('POST', body));
  }

  getPendingReviews() {
    const route = this.baseURL + 'review/pending';
    return fetch(route, this.getConfig('GET'));
  }

  // ADMINISTRATOR

  // user

  adminCreateUser(body: any) {
    const route = this.baseURL + 'user';
    return fetch(route, this.getConfig('POST', body));
  }

  adminUpdateUser(id: number, body: any) {
    const route = this.baseURL + 'user/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  adminDeleteUser(id: number) {
    const route = this.baseURL + 'user/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  // agencies

  adminUpdateAgency(id: number, formData: FormData) {
    const route = this.baseURL + 'agency/admin/' + id;
    return fetch(route, this.getConfig('POST', null, formData));
  }

  adminUpdateAdopter(id: number, formData: FormData) {
    const route = this.baseURL + 'adopter/admin/' + id;
    return fetch(route, this.getConfig('POST', null, formData));
  }

  // status

  adminCreateStatus(body: any) {
    const route = this.baseURL + 'status';
    return fetch(route, this.getConfig('POST', body));
  }

  adminUpdateStatus(id: number, body: any) {
    const route = this.baseURL + 'status/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  adminDeleteStatus(id: number) {
    const route = this.baseURL + 'status/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  // type

  adminCreateType(body: any) {
    const route = this.baseURL + 'type';
    return fetch(route, this.getConfig('POST', body));
  }

  adminUpdateType(id: number, body: any) {
    const route = this.baseURL + 'type/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  adminDeleteType(id: number) {
    const route = this.baseURL + 'type/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  // breed

  adminCreateBreed(body: any) {
    const route = this.baseURL + 'breed';
    return fetch(route, this.getConfig('POST', body));
  }

  adminUpdateBreed(id: number, body: any) {
    const route = this.baseURL + 'breed/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  adminDeleteBreed(id: number) {
    const route = this.baseURL + 'breed/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  // coat colors

  adminCreateCoatColor(body: any) {
    const route = this.baseURL + 'coat';
    return fetch(route, this.getConfig('POST', body));
  }

  adminUpdateCoatColor(id: number, body: any) {
    const route = this.baseURL + 'coat/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  adminDeleteCoatColor(id: number) {
    const route = this.baseURL + 'coat/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  // animals and pictures


  adminUpdateAnimal(id: number, body: any) {
    const route = this.baseURL + 'animal/admin/' + id;
    return fetch(route, this.getConfig('PUT', body));
  }

  adminDeleteAnimal(id: number) {
    const route = this.baseURL + 'animal/admin/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

  adminDeletePicture(id: number) {
    const route = this.baseURL + 'picture/admin/' + id;
    return fetch(route, this.getConfig('DELETE'));
  }

}
