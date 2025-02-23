import { Injectable, inject } from '@angular/core';

// Services

import { BridgeApiService } from './api/bridge-api.service';

// Interfaces

import { ReviewRequestBody } from './../interfaces/review-request-body';
import { ApplicationRequestBody } from './../interfaces/api/application-request-body';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  // Application

  addApplication(animalId: number, body: ApplicationRequestBody) {
    return this.bridgeApiService.chosenAPI.addApplication(animalId, body);
  }

  acceptApplication(id: number) {
    return this.bridgeApiService.chosenAPI.acceptApplication(id);
  }

  refuseApplication(id: number) {
    return this.bridgeApiService.chosenAPI.refuseApplication(id);
  }

  // User

  getUsers() {
    return this.bridgeApiService.chosenAPI.getUsers();
  }

  getPetAgencies() {
    return this.bridgeApiService.chosenAPI.getPetAgencies();
  }

  getPetAdopters() {
    return this.bridgeApiService.chosenAPI.getPetAdopters();
  }

  getPetAdopterById(id: number) {
    return this.bridgeApiService.chosenAPI.getPetAdopterById(id);
  }

  getPetAgencyById(id: number) {
    return this.bridgeApiService.chosenAPI.getPetAgencyById(id);
  }

  // Profile

  storePetAgencyProfile(formData: FormData) {
    return this.bridgeApiService.chosenAPI.storePetAgencyProfile(formData);
  }

  storePetAdopterProfile(formData: FormData) {
    return this.bridgeApiService.chosenAPI.storePetAdopterProfile(formData);
  }

  // Animal

  getAnimal(id: number) {
    return this.bridgeApiService.chosenAPI.getAnimal(id);
  }

  getAnimals() {
    return this.bridgeApiService.chosenAPI.getAnimals();
  }

  getAnimalsByType(type: string) {
    return this.bridgeApiService.chosenAPI.getAnimalsByType(type);
  }

  getAnimalBreeds() {
    return this.bridgeApiService.chosenAPI.getAnimalBreeds();
  }

  getAnimalBreedsByType(type: string) {
    return this.bridgeApiService.chosenAPI.getAnimalBreedsByType(type);
  }

  getAnimalCoatColors() {
    return this.bridgeApiService.chosenAPI.getAnimalCoatColors();
  }

  getAnimalsByPetAgency(id: number) {
    return this.bridgeApiService.chosenAPI.getAnimalsByPetAgency(id);
  }

  createAnimal(formData: FormData) {
    return this.bridgeApiService.chosenAPI.createAnimal(formData);
  }

  updateAnimal(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.updateAnimal(id, body);
  }

  deleteAnimal(id: number) {
    return this.bridgeApiService.chosenAPI.deleteAnimal(id);
  }

  // Picture

  getAnimalPicturesByAnimalId(id: number) {
    return this.bridgeApiService.chosenAPI.getAnimalPicturesByAnimalId(id);
  }

  deleteAnimalPicture(id: number) {
    return this.bridgeApiService.chosenAPI.deleteAnimalPicture(id);
  }

  // Type

  getTypes() {
    return this.bridgeApiService.chosenAPI.getTypes();
  }

  getTypeById(id: number) {
    return this.bridgeApiService.chosenAPI.getTypeById(id);
  }

  // Status

  getStatusById(id: number) {
    return this.bridgeApiService.chosenAPI.getStatusById(id);
  }

  getStatuses() {
    return this.bridgeApiService.chosenAPI.getStatuses();
  }

  // Reviews

  leaveReview(body: ReviewRequestBody) {
    return this.bridgeApiService.chosenAPI.leaveReview(body);
  }

  getPendingReviews() {
    return this.bridgeApiService.chosenAPI.getPendingReviews();
  }

  // Administrator

  // ADMINISTRATOR

  adminCreateUser(body: any) {
    return this.bridgeApiService.chosenAPI.adminCreateUser(body);
  }

  adminUpdateUser(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.adminUpdateUser(id, body);
  }

  adminDeleteUser(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeleteUser(id);
  }

  adminUpdateAgency(id: number, formData: FormData) {
    return this.bridgeApiService.chosenAPI.adminUpdateAgency(id, formData);
  }

  adminUpdateAdopter(id: number, formData: FormData) {
    return this.bridgeApiService.chosenAPI.adminUpdateAdopter(id, formData);
  }

  adminCreateStatus(body: any) {
    return this.bridgeApiService.chosenAPI.adminCreateStatus(body);
  }

  adminUpdateStatus(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.adminUpdateStatus(id, body);
  }

  adminDeleteStatus(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeleteStatus(id);
  }

  adminCreateType(body: any) {
    return this.bridgeApiService.chosenAPI.adminCreateType(body);
  }

  adminUpdateType(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.adminUpdateType(id, body);
  }

  adminDeleteType(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeleteType(id);
  }

  adminCreateBreed(body: any) {
    return this.bridgeApiService.chosenAPI.adminCreateBreed(body);
  }

  adminUpdateBreed(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.adminUpdateBreed(id, body);
  }

  adminDeleteBreed(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeleteBreed(id);
  }

  adminCreateCoatColor(body: any) {
    return this.bridgeApiService.chosenAPI.adminCreateCoatColor(body);
  }

  adminUpdateCoatColor(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.adminUpdateCoatColor(id, body);
  }

  adminDeleteCoatColor(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeleteCoatColor(id);
  }

  adminUpdateAnimal(id: number, body: any) {
    return this.bridgeApiService.chosenAPI.adminUpdateAnimal(id, body);
  }

  adminDeleteAnimal(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeleteAnimal(id);
  }

  adminDeletePicture(id: number) {
    return this.bridgeApiService.chosenAPI.adminDeletePicture(id);
  }

}
