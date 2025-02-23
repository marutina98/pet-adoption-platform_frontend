import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// Data

import _users from './../../../assets/data/users.json';
import _animals from './../../../assets/data/animals.json';
import _reviews from './../../../assets/data/reviews.json';
import _statuses from './../../../assets/data/statuses.json';

import _agencies from './../../../assets/data/pet_agencies.json';
import _adopters from './../../../assets/data/pet_adopters.json';

import _types from './../../../assets/data/animal_types.json';
import _breeds from './../../../assets/data/animal_breeds.json';
import _pictures from './../../../assets/data/animal_pictures.json';
import _coatColors from './../../../assets/data/animal_coat_colors.json';

import _applications from './../../../assets/data/applications.json';
import _applicationStatuses from './../../../assets/data/application_statuses.json';

// Interfaces

import { ApplicationRequestBody } from './../../interfaces/api/application-request-body';
import { RegistrationRequestBody } from './../../interfaces/api/registration-request-body';
import { ReviewRequestBody } from './../../interfaces/review-request-body';
import { User } from '../../interfaces/user';

interface Id {
  id: number,
}

@Injectable({
  providedIn: 'root'
})
export class MockApiHelpersService {

  private cookieService = inject(CookieService);

  get users() {
    const cookieUsers = this.cookieService.get('users');
    const parsedUsers = cookieUsers ? JSON.parse(cookieUsers) : [];
    return this.getUniqueItemsById([..._users, ...parsedUsers]);
  }

  get animals() {
    const cookieAnimals = this.cookieService.get('animals');
    const parsedAnimals = cookieAnimals ? JSON.parse(cookieAnimals) : [];
    const arr = this.getUniqueItemsById([..._animals, ...parsedAnimals]);
    return arr.map((a: any) => {
      a.animal_pictures = this.pictures.filter((p: any) => p.animal_id == a.id);
      return a;
    });
  }

  get agencies() {
    const cookieAgencies = this.cookieService.get('agencies');
    const parsedAgencies = cookieAgencies ? JSON.parse(cookieAgencies) : [];
    const arr = this.getUniqueItemsById([..._agencies, ...parsedAgencies]);
    const result = arr.map((a: any) => {
      const user = this.users.find((u: any) => u.id === a.user_id);
      a.user = this.addReviewsToUser(user);
      return a;
    });
    return result;
  }

  get adopters() {
    const cookieAdopters = this.cookieService.get('adopters');
    const parsedAdopters = cookieAdopters ? JSON.parse(cookieAdopters) : [];
    const arr = this.getUniqueItemsById([..._adopters, ...parsedAdopters])
    const result = arr.map((a: any) => {
      const user = this.users.find((u: any) => u.id === a.user_id);
      a.user = this.addReviewsToUser(user);
      return a;
    });
    return result;
  }

  get types() {
    const cookieTypes = this.cookieService.get('types');
    const parsedTypes = cookieTypes ? JSON.parse(cookieTypes) : [];
    return this.getUniqueItemsById([..._types, ...parsedTypes]);
  }

  get breeds() {
    const cookieBreeds = this.cookieService.get('breeds');
    const parsedBreeds = cookieBreeds ? JSON.parse(cookieBreeds) : [];
    return this.getUniqueItemsById([..._breeds, ...parsedBreeds]);
  }

  get statuses() {
    const cookieStatuses = this.cookieService.get('statuses');
    const parsedStatuses = cookieStatuses ? JSON.parse(cookieStatuses) : [];
    return this.getUniqueItemsById([..._statuses, ...parsedStatuses]);
  }

  get coatColors() {
    const cookieCoatColors = this.cookieService.get('coat_colors');
    const parsedCoatColors = cookieCoatColors ? JSON.parse(cookieCoatColors) : [];
    return this.getUniqueItemsById([..._coatColors, ...parsedCoatColors]);
  }

  get pictures() {
    const cookiePictures = this.cookieService.get('pictures');
    const parsedPictures = cookiePictures ? JSON.parse(cookiePictures) : [];
    return this.getUniqueItemsById([..._pictures, ...parsedPictures]);
  }

  get reviews() {
    const cookieReviews = this.cookieService.get('reviews');
    const parsedReviews = cookieReviews ? JSON.parse(cookieReviews) : [];
    return this.getUniqueItemsById([..._reviews, ...parsedReviews]);
  }

  get applications() {
    const cookieApplications = this.cookieService.get('applications');
    const parsedApplications = cookieApplications ? JSON.parse(cookieApplications) : [];
    return this.getUniqueItemsById([..._applications, ...parsedApplications]);
  }

  get applicationStatuses() {
    const cookieApplicationStatuses = this.cookieService.get('application_statuses');
    const parsedApplicationStatuses = cookieApplicationStatuses ? JSON.parse(cookieApplicationStatuses) : [];
    return this.getUniqueItemsById([..._applicationStatuses, ...parsedApplicationStatuses]);
  }

  // get

  getUserById(id: number) {
    return this.addInfoToUser(this.users.find((u: any) => u.id === id));
  }

  getUserByEmail(email: string) {
    return this.addInfoToUser(this.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase()));
  }

  getPetAgencyById(id: number) {
    const agency = this.agencies.find((a: any) => a.id == id);
    agency.user = this.users.find((u: any) => u.id === agency.user_id);
    agency.animals = this.getAnimalsByPetAgencyId(agency.id);
    agency.animals.map((a: any) => a.animal_pictures = this.getPicturesByAnimalId(a.id));
    return agency;
  }

  getPetAdopterById(id: number) {
    return this.adopters.find((a: any) => a.id === id);
  }

  getPetAgencyByUserId(userId: number) {
    const agency = this.agencies.find((a: any) => a.user_id == userId);
    agency.user = this.users.find((u: any) => u.id === agency.user_id);
    agency.animals = this.getAnimalsByPetAgencyId(agency.id);
    agency.animals.map((a: any) => a.animal_pictures = this.getPicturesByAnimalId(a.id));
    return agency;
  }

  getPetAdopterByUserId(userId: number) {
    return this.adopters.find((a: any) => a.user_id === userId);
  }

  getPetAdopterByAnimalId(animalId: number) {
    const animal = this.getAnimalById(animalId);
    return this.getPetAdopterById(animal.pet_adopter_id);
  }

  getAnimalById(id: number) {
    const animal = this.animals.find((a: any) => a.id == id);
    animal.animal_pictures = this.getPicturesByAnimalId(animal.id);
    return animal;
  }

  getAnimalsByPetAgencyId(id: number) {
    return this.animals.filter((a: any) => a.pet_agency_id === id);
  }

  getApplicationsByAnimalId(id: number) {
    return this.applications.filter((a: any) => a.animal_id == id);
  }

  getPicturesByAnimalId(id: number) {
    return this.pictures.filter((p: any) => p.animal_id == id);
  }

  checkIfEmailIsUnique(email: string) {
    const user = this.getUserByEmail(email);
    return user ? false : true;
  }

  getPendingPetAgencyReviews(user: any) {

    // get profile
    
    const profile = this.getPetAgencyByUserId(user.id);

    // get adopted animals
    // get the id of their adopter

    const adoptedAnimals = this.animals
      .filter(a => a.status_id === 2 && a.pet_agency_id === profile.id);

    const adoptersIds = adoptedAnimals.map(a => a.pet_adopter_id);

    // get reviewed pet adopters

    const reviewedPetAdopterIds = user.reviews_given.map((r: any) => r.reviewee_id);

    const notReviewedPetAdopterIds = adoptersIds.filter((adopterId: number) => {
      const adopter = this.getPetAdopterById(adopterId);
      return !reviewedPetAdopterIds.includes(adopter.user_id);
    });

    // return adopters to review

    return notReviewedPetAdopterIds.map((id: number) => {
      const adopter = this.getPetAdopterById(id);
        adopter.user = this.addInfoToUser(this.getUserById(adopter.user_id));
        delete adopter.user.pet_adopter;
        return adopter;
    });

  }

  getPendingPetAdopterReviews(user: any) {

    // get profile

    const profile = this.getPetAdopterByUserId(user.id);

    // get adopted animals
    // get agency ids of adopted animals (remove duplicates)
    // get agency user ids

    const animals = this.animals.filter((a: any) => a.pet_adopter_id === profile.id);
    const agenciesIds = [...new Set(animals.map((a: any) => a.pet_agency_id))];

    // confront them with reviews_given

    const reviewedAgenciesUserIds = user.reviews_given.map((r: any) => r.reviewee_id);

    const notReviewedPetAgenciesIds = agenciesIds.filter((agencyId: number) => {
      const agency = this.getPetAgencyById(agencyId);
      return !reviewedAgenciesUserIds.includes(agency.user_id);
    });

    // return agencies to review

    return notReviewedPetAgenciesIds.map((id: number) => {
      const agency = this.getPetAgencyById(id);
        agency.user = this.addInfoToUser(this.getUserById(agency.user_id));
        delete agency.user.pet_agency;
        return agency;
    });

  }

  getPendingReviews(userId: number) {

    const user = this.addInfoToUser(this.getUserById(userId));

    if (user && user.is_pet_adopter === 1)
      return this.getPendingPetAdopterReviews(user);

    if (user && user.is_pet_agency === 1)
      return this.getPendingPetAgencyReviews(user);

    return [];

  }

  getTypeByName(name: string) {
    return this.types.find(t => t.name.toLowerCase() === name.toLowerCase());
  }

  // application

  leaveReview(body: ReviewRequestBody) {

    const reviewer = this.getAuthenticatedUser();

    const rules = {
      rating: (v: any) => !isNaN(v) && [...Array(6).keys()].includes(Number(v)),
      comment: (v: any) => typeof v === 'string' && v.length > 0,
      reviewee_id: (v: any) => !isNaN(v),
    }

    const isValid = this.verifyData(body, rules);

    if (!isValid) throw new Error('Review is not valid.');

    const reviewee = this.getUserById(body.reviewee_id);

    if (!reviewee) throw new Error('User does not exist.');

    const review = {
      id: this.getLastElementId(this.reviews) + 1,
      comment: body.comment,
      rating: body.rating,
      reviewee_id: body.reviewee_id,
      reviewer_id: reviewer.id,
    }

    const cookieReviews = this.cookieService.get('reviews');
    const parsedReviews = cookieReviews ? JSON.parse(cookieReviews) : [];
    parsedReviews.push(review);

    this.cookieService.set('reviews', JSON.stringify(parsedReviews), { path: '/' });

    return {
      message: 'Review Creation: Success!',
      object: review,
      status: 200,
    }

  }

  acceptApplication(id: number) {

    // check if the application exists

    const application = this.getElementById(this.applications, id);

    if (!application) {
      throw new Error('No application found.');
    }

    const _application = application;
    _application.application_status_id = 2;

    // change animal status

    const animal = this.getAnimalById(_application.animal_id);
    animal.status_id = 2;
    animal.pet_adopter_id = _application.pet_adopter_id;

    const cookieAnimals = this.cookieService.get('animals');
    const parsedAnimals = cookieAnimals ? JSON.parse(cookieAnimals) : [];
    parsedAnimals.push(animal);

    this.cookieService.set('animals', JSON.stringify(parsedAnimals), { path: '/'});

    // add application to cookie

    const cookieApplications = this.cookieService.get('applications');
    const parsedApplications = cookieApplications ? JSON.parse(cookieApplications) : [];
    parsedApplications.push(_application);

    this.cookieService.set('applications', JSON.stringify(parsedApplications), { path: '/'});

    // return application

    return {
      message: 'Application Successfully updated.',
      object: _application,
      status: 200,
    }

  }

  refuseApplication(id: number) {

    // check if the application exists

    const application = this.getElementById(this.applications, id);

    if (!application) {
      throw new Error('No application found.');
    }

    const _application = application;
    _application.application_status_id = 3;

    // add application to cookie

    const cookieApplications = this.cookieService.get('applications');
    const parsedApplications = cookieApplications ? JSON.parse(cookieApplications) : [];
    parsedApplications.push(_application);

    this.cookieService.set('applications', JSON.stringify(parsedApplications), { path: '/'});

    // return application

    return {
      message: 'Application Successfully updated.',
      object: _application,
      status: 200,
    }

  }

  // post

  createAdopter(id: number) {

    const adopter = {
      'id': this.getLastElementId(this.adopters) + 1,
      'user_id': id,
    }

    const cookieAdopters = this.cookieService.get('adopters');
    const parsedAdopters = cookieAdopters ? JSON.parse(cookieAdopters) : [];
          parsedAdopters.push(adopter);

    this.cookieService.set('adopters', JSON.stringify(parsedAdopters), { path: '/' });

    return adopter;

  }

  createAnimal(formData: FormData) {

    const user = this.getAuthenticatedUser();
    const petAgency = this.getPetAgencyByUserId(user.id);

    /* check that the formdata is valid */

    const typeIds = this.types.map(t => t.id);
    const coatColorIds = this.coatColors.map(t => t.id);

    const rules = {
      sex: (v: any) => !isNaN(v) && [0,1].includes(Number(v)),
      name: (v: any) => typeof v === 'string' && v.length > 0,
      birthdate: (v: any) => !isNaN(Date.parse(v)),
      description: (v: any) => typeof v === 'string' && v.length > 0,
      coat_length: (v: any) => !isNaN(v) && [0,1,2].includes(Number(v)),
      animal_type_id: (v: any) => !isNaN(v) && typeIds.includes(Number(v)),
      animal_breed_id: (v: any) => v === '' || !isNaN(v),
      animal_coat_color_id: (v: any) => !isNaN(v) && coatColorIds.includes(Number(v)),
      pictures: (v: any) => {
        const files = formData.getAll('pictures[]');
        return Array.isArray(files) && files.length >= 1 && files.every((f) => f instanceof File);
      }
    }

    const formDataValidationInfo = this.verifyFormData(formData, rules);

    if (!formDataValidationInfo.status) {
      throw new Error(formDataValidationInfo.errors.join('\n'));
    }

    // check that the animal breed (if present) is valid

    const animalTypeId = Number(formData.get('animal_type_id'));
    const animalBreedId = Number(formData.get('animal_breed_id')) ?? null;

    if (animalBreedId) {

      const validBreeds = this.breeds.filter(b => b.animal_type_id === animalTypeId).map(b => b.id);

      if (!validBreeds.includes(animalBreedId)) {
        throw new Error('Animal Creation: The chosen Animal Breed is not available for the chosen Animal Type.');
      }

    }

    // create the animal here

    const timestamp = this.getTimestamp();

    const _animal = {
      id: this.getLastElementId(this.animals) + 1,
      sex: formData.get('sex'),
      name: formData.get('name'),
      birthdate: formData.get('birthdate'),
      description: formData.get('description'),
      coat_length: formData.get('coat_length'),
      animal_type_id: formData.get('animal_type_id'),
      animal_breed_id: animalBreedId,
      animal_coat_color_id: formData.get('animal_coat_color_id'),
      created_at: timestamp,
      updated_at: timestamp,
      status_id: 1,
      pet_agency_id: petAgency.id,
      pet_adopter_id: null,
    }

    const cookieAnimals = this.cookieService.get('animals');
    const parsedAnimals = cookieAnimals ? JSON.parse(cookieAnimals) : [];
    parsedAnimals.push(_animal);

    this.cookieService.set('animals', JSON.stringify(parsedAnimals), { path: '/' });

    // create *n* of animal pictures with placeholder

    formData.getAll('pictures[]').forEach(() => {

      const timestamp = this.getTimestamp();

      const _picture = {
        id: this.getLastElementId(this.pictures) + 1,
        animal_id: _animal.id,
        path: 'images/placeholder.png',
        created_at: timestamp,
        updated_at: timestamp,
      }

      const cookiePictures = this.cookieService.get('pictures');
      const parsedPictures = cookiePictures ? JSON.parse(cookiePictures) : [];
      parsedPictures.push(_picture);

      this.cookieService.set('pictures', JSON.stringify(parsedPictures), { path: '/' });

    });

    return {
      message: 'Animal Creation: Success!',
      object: _animal,
      status: 200,
    }

  }

  updateAnimal(id: number, body: any) {

    // check if the animal exists
    // if there is no animal, throw new error

    const animal = this.getAnimalById(id);

    if (!animal) throw new Error('Animal does not exist.');

    // check if the received data is valid
    // throw error if invalid

    const typeIds = this.types.map(t => t.id);
    const coatColorIds = this.coatColors.map(t => t.id);

    const rules = {
      sex: (v: any) => !isNaN(v) && [0,1].includes(Number(v)),
      name: (v: any) => typeof v === 'string' && v.length > 0,
      birthdate: (v: any) => !isNaN(Date.parse(v)),
      description: (v: any) => typeof v === 'string' && v.length > 0,
      coat_length: (v: any) => !isNaN(v) && [0,1,2].includes(Number(v)),
      animal_type_id: (v: any) => !isNaN(v) && typeIds.includes(Number(v)),
      animal_breed_id: (v: any) => v === '' || !isNaN(v),
      animal_coat_color_id: (v: any) => !isNaN(v) && coatColorIds.includes(Number(v)),
    }

    const dataValidationInfo = this.verifyData(body, rules);

    if (!dataValidationInfo.status) throw new Error(dataValidationInfo.errors.join('\n'));

    // check that the breed is valid also or throw error

    const animalTypeId = body.animal_type_id;
    const animalBreedId = body.animal_breed_id ?? null;

    if (animalBreedId) {

      const validBreeds = this.breeds.filter(b => b.animal_type_id == animalTypeId).map(b => b.id);

      if (!validBreeds.includes(animalBreedId)) {
        throw new Error('Animal Creation: The chosen Animal Breed is not available for the chosen Animal Type.');
      }

    }

    // update animal

    const _animal = animal;

    _animal.sex = body.sex;
    _animal.birthdate = body.birthdate;
    _animal.name = body.name;
    _animal.coat_length = body.coat_length;
    _animal.description = body.description;
    _animal.animal_type_id = body.animal_type_id;
    _animal.animal_breed_id = animalBreedId;
    _animal.updated_at = this.getTimestamp();

    const cookieAnimals = this.cookieService.get('animals');
    const parsedAnimals = cookieAnimals ? JSON.parse(cookieAnimals) : [];
    parsedAnimals.push(_animal);

    this.cookieService.set('animals', JSON.stringify(parsedAnimals), { path: '/' });

    return {
      message: 'Animal Update: Success!',
      object: _animal,
      status: 200,
    }

  }

  deleteAnimal(id: number) {

    // check if the animal exists
    // if there is no animal, throw new error

    const animal = this.getAnimalById(id);

    if (!animal) throw new Error('Animal does not exist.');

    // delete animal from cookie

    const cookieAnimals = this.cookieService.get('animals');
    const parsedAnimals = cookieAnimals ? JSON.parse(cookieAnimals) : [];
    const updatedAnimals = parsedAnimals.filter((a: any) => a.id !== id);
    this.cookieService.set('animals', JSON.stringify(updatedAnimals), { path: '/' });

    // delete all adoption applications received

    const cookieApplications = this.cookieService.get('applications');
    const parsedApplications = cookieAnimals ? JSON.parse(cookieApplications) : [];
    const updatedApplications = parsedAnimals.filter((a: any) => a.animal_id !== id);
    this.cookieService.set('applications', JSON.stringify(updatedApplications), { path: '/' });

    // delete animal pictures from cookie

    const cookiePictures = this.cookieService.get('pictures');
    const parsedPictures = cookiePictures ? JSON.parse(cookiePictures) : [];
    const updatedPictures = parsedPictures.filter((a: any) => a.animal_id !== id);
    this.cookieService.set('pictures', JSON.stringify(updatedPictures), { path: '/' });

    return {
      message: 'Animal Deletion: Success!.',
      status: 200
    }

  }

  deleteAnimalPicture(id: number) {

    // check if the picture exists
    // if there is no picture, throw new error

    const picture = this.getElementById(this.pictures, id);

    if (!picture) throw new Error('Animal Picture does not exist.');

    // delete picture from cookie

    const cookiePictures = this.cookieService.get('pictures');
    const parsedPictures = cookiePictures ? JSON.parse(cookiePictures) : [];
    const updatedPictures = parsedPictures.filter((a: any) => a.id !== id);
    this.cookieService.set('pictures', JSON.stringify(updatedPictures), { path: '/' });

    return {
      message: 'Animal Picture Deletion: Success!.',
      status: 200
    }

  }

  // user

  createUser(_user: any) {

    const timestamp = this.getTimestamp();

    const user = {
      'id': this.getLastElementId(this.users) + 1,
      'email': _user.email,
      'password': _user.password,
      'remember_token': 'token',
      'created_at': timestamp,
      'updated_at': timestamp,
      'email_verified_at': timestamp,
      'is_pet_adopter': _user.is_pet_adopter,
      'is_pet_agency': _user.is_pet_agency,
      'is_administrator': _user.is_administrator,
    }

    const cookieUsers = this.cookieService.get('users');
    const parsedUsers = cookieUsers ? JSON.parse(cookieUsers) : [];
          parsedUsers.push(user);

    this.cookieService.set('users', JSON.stringify(parsedUsers), { path: '/' });

    if (user.is_pet_adopter) this.createAdopter(user.id);
    if (user.is_pet_agency) this.createAgency(user.id);

    return user;

  }

  createAgency(id: number) {

    const agency = {
      'id': this.getLastElementId(this.agencies) + 1,
      'user_id': id,
    }

    const cookieAgencies = this.cookieService.get('agencies');
    const parsedAgencies = cookieAgencies ? JSON.parse(cookieAgencies) : [];
          parsedAgencies.push(agency);

    this.cookieService.set('agencies', JSON.stringify(parsedAgencies), { path: '/' });

    return agency;

  }

  storePetAgencyProfile(formData: FormData) {

    const user = this.getAuthenticatedUser();
    const _agency = this.getPetAgencyByUserId(user.id);
    const agencyId = _agency ? _agency.id : this.getLastElementId(this.agencies) + 1;

    const timestamp = this.getTimestamp();
    const profile = this.convertFormDataToObject(formData);

    const agency = {
      id: agencyId,
      name: profile['name'],
      phone: profile['phone'],
      address: profile['address'],
      picture: 'images/placeholder.png',
      description: profile['description'],
      website: profile['website'],
      user_id: user.id,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieAgencies = this.cookieService.get('agencies');
    const parsedAgencies = cookieAgencies ? JSON.parse(cookieAgencies) : [];

    parsedAgencies.push(agency);

    this.cookieService.set('agencies', JSON.stringify(parsedAgencies), { path: '/' });

    return {
      message: 'Pet Agency: Success!.',
      object: this.getAuthenticatedUser(),
      status: 200
    }

  }

  storePetAdopterProfile(formData: FormData) {

    const user = this.getAuthenticatedUser();

    console.log('storePetAdopterProfile', user);

    const _adopter = this.getPetAdopterByUserId(user.id);
    const adopterId = _adopter ? _adopter.id : this.getLastElementId(this.adopters) + 1;

    const timestamp = this.getTimestamp();
    const profile = this.convertFormDataToObject(formData);

    const adopter = {
      id: adopterId,
      name: profile['name'],
      phone: profile['phone'],
      address: profile['address'],
      picture: 'images/placeholder.png',
      user_id: user.id,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieAdopters = this.cookieService.get('adopters');
    const parsedAdopters = cookieAdopters ? JSON.parse(cookieAdopters) : [];

    parsedAdopters.push(adopter);

    this.cookieService.set('adopters', JSON.stringify(parsedAdopters), { path: '/' });

    return {
      message: 'Pet Adopter: Success!.',
      object: this.getAuthenticatedUser(),
      status: 200
    }

  }

  addApplication(animalId: number, body: ApplicationRequestBody) {

    const timestamp = this.getTimestamp();

    const user = this.getAuthenticatedUser();
    const adopter = this.getPetAdopterByUserId(user.id);

    const application = {
      id: this.getLastElementId(this.applications) + 1,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      animal_id: animalId,
      pet_adopter_id: adopter.id,
      created_at: timestamp,
      updated_at: timestamp,
      application_status_id: 1,
    }

    const cookieApplications = this.cookieService.get('applications');
    const parsedApplications = cookieApplications ? JSON.parse(cookieApplications) : [];

    parsedApplications.push(application);

    this.cookieService.set('applications', JSON.stringify(parsedApplications), { path: '/'});

    return {
      message: 'Application Successfully Sent.',
      object: application,
      status: 200,
    }

  }

  // ADMIN

  adminUpdateAgency(id: number, formData: FormData) {

    const oldProfile = this.getPetAgencyById(id);
    const newProfile = this.convertFormDataToObject(formData);

    const timestamp = this.getTimestamp();

    const agency = {
      id: id,
      name: newProfile['name'],
      phone: newProfile['phone'],
      address: newProfile['address'],
      picture: 'images/placeholder.png',
      description: newProfile['description'],
      website: newProfile['website'],
      user_id: oldProfile.user_id,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieAgencies = this.cookieService.get('agencies');
    const parsedAgencies = cookieAgencies ? JSON.parse(cookieAgencies) : [];

    parsedAgencies.push(agency);

    this.cookieService.set('agencies', JSON.stringify(parsedAgencies), { path: '/' });

    return {
      message: 'Pet Agency: Success!.',
      object: this.getAuthenticatedUser(),
      status: 200
    }

  }

  adminUpdateAdopter(id: number, formData: FormData) {

    const oldProfile = this.getPetAdopterById(id);
    const newProfile = this.convertFormDataToObject(formData);

    const timestamp = this.getTimestamp();

    const adopter = {
      id: id,
      name: newProfile['name'],
      phone: newProfile['phone'],
      address: newProfile['address'],
      picture: 'images/placeholder.png',
      user_id: oldProfile.user_id,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieAdopters = this.cookieService.get('adopters');
    const parsedAdopters = cookieAdopters ? JSON.parse(cookieAdopters) : [];

    parsedAdopters.push(adopter);

    this.cookieService.set('adopters', JSON.stringify(parsedAdopters), { path: '/' });

    return {
      message: 'Pet Adopter: Success!.',
      object: this.getAuthenticatedUser(),
      status: 200
    }

  }

  adminCreateStatus(data: any) {

    const timestamp = this.getTimestamp();

    const status = {
      id: this.getLastElementId(this.statuses) + 1,
      name: data.name,
      description: data.description,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieStatuses = this.cookieService.get('statuses');
    const parsedStatuses = cookieStatuses ? JSON.parse(cookieStatuses) : [];

    parsedStatuses.push(status);

    this.cookieService.set('statuses', JSON.stringify(parsedStatuses), { path: '/' });

    return {
      message: 'Status: Success!.',
      object: status,
      status: 200
    }

  }

  adminUpdateStatus(id: number, data: any) {

    const _status = this.getElementById(this.statuses, id);

    if (_status) {

      const status = {
        id: id,
        name: data.name,
        description: data.description,
        created_at: _status.created_at,
        updated_at: this.getTimestamp(),
      }

      const cookieStatuses = this.cookieService.get('statuses');
      const parsedStatuses = cookieStatuses ? JSON.parse(cookieStatuses) : [];

      parsedStatuses.push(status);

      this.cookieService.set('statuses', JSON.stringify(parsedStatuses), { path: '/' });

      return {
        message: 'Status: Success!.',
        object: status,
        status: 200
      }

    } else {
      throw new Error('Status Not Found!');
    }

  }

  adminCreateType(data: any) {

    const timestamp = this.getTimestamp();

    const type = {
      id: this.getLastElementId(this.types) + 1,
      name: data.name,
      description: data.description,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieTypes = this.cookieService.get('types');
    const parsedTypes = cookieTypes ? JSON.parse(cookieTypes) : [];

    parsedTypes.push(type);

    this.cookieService.set('types', JSON.stringify(parsedTypes), { path: '/' });

    return {
      message: 'Types: Success!.',
      object: type,
      status: 200
    }

  }

  adminUpdateType(id: number, data: any) {

    const _type = this.getElementById(this.types, id);

    if (_type) {

      const type = {
        id: id,
        name: data.name,
        description: data.description,
        created_at: _type.created_at,
        updated_at: this.getTimestamp(),
      }

      const cookieTypes = this.cookieService.get('types');
      const parsedTypes = cookieTypes ? JSON.parse(cookieTypes) : [];

      parsedTypes.push(type);

      this.cookieService.set('types', JSON.stringify(parsedTypes), { path: '/' });

      return {
        message: 'Type: Success!.',
        object: type,
        status: 200
      }

    } else {
      throw new Error('Type Not Found!');
    }

  }

  adminCreateBreed(data: any) {

    const timestamp = this.getTimestamp();

    const breed = {
      id: this.getLastElementId(this.breeds) + 1,
      name: data.name,
      description: data.description,
      animal_type_id: data.animal_type_id,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieBreeds = this.cookieService.get('breeds');
    const parsedBreeds = cookieBreeds ? JSON.parse(cookieBreeds) : [];

    parsedBreeds.push(breed);

    this.cookieService.set('breeds', JSON.stringify(parsedBreeds), { path: '/' });

    return {
      message: 'Breed: Success!.',
      object: breed,
      status: 200
    }

  }

  adminUpdateBreed(id: number, data: any) {

    const _breed = this.getElementById(this.breeds, id);

    if (_breed) {

      const breed = {
        id: id,
        name: data.name,
        description: data.description,
        animal_type_id: data.animal_type_id,
        created_at: _breed.created_at,
        updated_at: this.getTimestamp(),
      }

      const cookieBreed = this.cookieService.get('breeds');
      const parsedBreed = cookieBreed ? JSON.parse(cookieBreed) : [];

      parsedBreed.push(breed);

      this.cookieService.set('breeds', JSON.stringify(parsedBreed), { path: '/' });

      return {
        message: 'Breed: Success!.',
        object: breed,
        status: 200
      }

    } else {
      throw new Error('Breed Not Found!');
    }

  }

  adminCreateCoatColor(data: any) {

    const timestamp = this.getTimestamp();

    const coatColor = {
      id: this.getLastElementId(this.coatColors) + 1,
      name: data.name,
      hex_color: data.hex_color,
      created_at: timestamp,
      updated_at: timestamp,
    }

    const cookieCoatColors = this.cookieService.get('coat_colors');
    const parsedCoatColors = cookieCoatColors ? JSON.parse(cookieCoatColors) : [];

    parsedCoatColors.push(coatColor);

    this.cookieService.set('coat_colors', JSON.stringify(parsedCoatColors), { path: '/' });

    return {
      message: 'Coat Color: Success!.',
      object: coatColor,
      status: 200
    }

  }

  adminUpdateCoatColor(id: number, data: any) {

    const _coatColor = this.getElementById(this.coatColors, id);

    if (_coatColor) {

      const coatColor = {
        id: _coatColor.id,
        name: data.name,
        hex_color: data.hex_color,
        created_at: _coatColor.created_at,
        updated_at: this.getTimestamp(),
      }

      const cookieCoatColors = this.cookieService.get('coat_colors');
      const parsedCoatColors = cookieCoatColors ? JSON.parse(cookieCoatColors) : [];
            parsedCoatColors.push(coatColor);
  
      this.cookieService.set('coat_colors', JSON.stringify(parsedCoatColors), { path: '/' });
  
      return {
        message: 'Coat Color: Success!.',
        object: coatColor,
        status: 200
      }

    } else {
      throw new Error('Coat Color Not Found!');
    }

  }

  // animal

  adminUpdateAnimal(id: number, body: any) {
    return this.updateAnimal(id, body);
  }

  adminDeleteAnimal(id: number) {
    return this.deleteAnimal(id);
  }

  adminDeletePicture(id: number) {
    return this.deleteAnimalPicture(id);
  }

  // user

  adminCreateUser(_user: any) {
    return this.createUser(_user);
  }

  adminUpdateUser(id: number, _user: any) {

    const ogUser = this.getUserById(id);

    if (ogUser) {

      // check that user type is valid:
      // only one among 'is_pet_adopter', 'is_pet_agency', 'is_administrator' can
      // be true, otherwise throw error.

      const userTypes = [
        !!_user.is_pet_adopter,
        !!_user.is_pet_agency,
        !!_user.is_administrator
      ];

      const isUserTypeValid = userTypes.filter(Boolean).length === 1;

      if (!isUserTypeValid) {
        throw new Error('User can only be of one type!');
      }

      // if the new type of the user is different from the previous
      // delete the wrong profile (if in the cookie) and create the
      // new one

      const wasPetAdopter = Boolean(ogUser.is_pet_adopter);
      const wasPetAgency = Boolean(ogUser.is_pet_agency);
      const wasAdministrator = Boolean(ogUser.is_administrator);

      const isPetAdopter = Boolean(_user.is_pet_adopter);
      const isPetAgency = Boolean(_user.is_pet_agency);
      const isAdministrator = Boolean(_user.is_administrator);

      if (isAdministrator && wasAdministrator !== isAdministrator) {
        this.removeAgencyProfile(id);
        this.removeAdopterProfile(id);
      }

      if (isPetAdopter && wasPetAgency) {

        const formData = new FormData();

        formData.append('name', '');
        formData.append('phone', '');
        formData.append('address', '');

        this.storePetAdopterProfile(formData);
        this.removeAgencyProfile(id);
      }

      if (isPetAgency && wasPetAdopter) {

        const formData = new FormData();

        formData.append('name', '');
        formData.append('phone', '');
        formData.append('address', '');
        formData.append('description', '');
        formData.append('website', '');

        this.storePetAgencyProfile(formData);
        this.removeAdopterProfile(id);
      }

      // update the user

    const updatedUser = {
      'id': id,
      'email': _user.email,
      'password': _user.password,
      'remember_token': 'token',
      'created_at': ogUser.created_at,
      'updated_at': this.getTimestamp(),
      'email_verified_at': ogUser.email_verified_at,
      'is_pet_adopter': _user.is_pet_adopter,
      'is_pet_agency': _user.is_pet_agency,
      'is_administrator': _user.is_administrator,
    }

    const cookieUsers = this.cookieService.get('users');
    const parsedUsers = cookieUsers ? JSON.parse(cookieUsers) : [];
          parsedUsers.push(updatedUser);

    this.cookieService.set('users', JSON.stringify(parsedUsers), { path: '/' });

    return this.getUserById(id);

    } else {
      throw new Error('User Not Found!');
    }

  }

  adminDeleteUser(id: number) {

    const user = this.getUserById(id);

    if (user) {

      const cookieUsers = this.cookieService.get('users');
      const parsedUsers = cookieUsers ? JSON.parse(cookieUsers) : [];
      const updatedUsers = parsedUsers.filter((a: any) => a.id !== id);
      this.cookieService.set('users', JSON.stringify(updatedUsers), { path: '/' });

      return {
        message: 'User Deletion: Success!.',
        status: 200
      }

    } else {
      throw new Error('User Not Found!');
    }

  }

  adminDeleteType(id: number) {

    const type = this.getElementById(this.types, id);

    if (type) {

      const cookieTypes = this.cookieService.get('types');
      const parsedTypes = cookieTypes ? JSON.parse(cookieTypes) : [];
      const updatedTypes = parsedTypes.filter((a: any) => a.id !== id);
      this.cookieService.set('types', JSON.stringify(updatedTypes), { path: '/' });

      return {
        message: 'Type Deletion: Success!.',
        status: 200
      }

    } else {
      throw new Error('Type Not Found!');
    }

  }

  adminDeleteBreed(id: number) {

    const breed = this.getElementById(this.breeds, id);

    if (breed) {

      const cookieBreeds = this.cookieService.get('breeds');
      const parsedBreeds = cookieBreeds ? JSON.parse(cookieBreeds) : [];
      const updatedBreeds = parsedBreeds.filter((a: any) => a.id !== id);
      this.cookieService.set('breeds', JSON.stringify(updatedBreeds), { path: '/' });

      return {
        message: 'Breed Deletion: Success!.',
        status: 200
      }

    } else {
      throw new Error('Breed Not Found!');
    }

  }

  adminDeleteStatus(id: number) {

    const status = this.getElementById(this.statuses, id);

    if (status) {

      const cookieStatuses = this.cookieService.get('statuses');
      const parsedStatuses = cookieStatuses ? JSON.parse(cookieStatuses) : [];
      const updatedStatuses = parsedStatuses.filter((a: any) => a.id !== id);
      this.cookieService.set('statuses', JSON.stringify(updatedStatuses), { path: '/' });

      return {
        message: 'Status Deletion: Success!.',
        status: 200
      }

    } else {
      throw new Error('Status Not Found!');
    }

  }

  adminDeleteCoatColor(id: number) {

    const coatColor = this.getElementById(this.coatColors, id);

    if (coatColor) {

      const cookieCoatColors = this.cookieService.get('coat_colors');
      const parsedCoatColors = cookieCoatColors ? JSON.parse(cookieCoatColors) : [];
      const updatedCoatColors = parsedCoatColors.filter((a: any) => a.id !== id);
      this.cookieService.set('coat_colors', JSON.stringify(updatedCoatColors), { path: '/' });

      return {
        message: 'Coat Color Deletion: Success!.',
        status: 200
      }

    } else {
      throw new Error('Coat Color Not Found!');
    }

  }

  // Helpers

  getAuthenticatedUser() {
    const id = Number(this.cookieService.get('id'));
    return this.getUserById(id);
  }

  getErrorMessage(error: any) {
    return {
      json: () => Promise.resolve({
        message: 'An Unexpected Error Occured.',
        error: error,
      }),
      status: 500,
      ok: false,
    }
  }

  getTimestamp() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  // I want the elements in the cookie to replace the elements in the json,
  // as if they were just updated with PUT, this function helps with that.

  getElementById(arr: Id[], id: number): any {
    return arr.find(e => Number(e.id) === id);
  }

  getUniqueItemsById(elements: Id[]): any[] {
    const elementsMap = new Map();
    elements.forEach(element => elementsMap.set(element.id, element));
    return Array.from(elementsMap.values());
  }

  getLastElementId(arr: Id[]): number {
    return arr.length > 0 ? arr[arr.length - 1].id : 0;
  }

  convertFormDataToObject(formData: FormData) {
    const data: Record<string, FormDataEntryValue> = {};
  
    for (let [k, v] of formData) {
      data[k] = v;
    }

    return data;
  }

  addReviewsToUser(user: any) {

    if (user) {
      user.reviews_given = this.reviews.filter((r: any) => r.reviewer_id === user.id);
      user.reviews_received = this.reviews.filter((r: any) => r.reviewee_id === user.id);
      return user;
    }

    return null;
  }

  addInfoToUser(user: any) {

    if (user) {

      user.pet_agency = this.agencies.find((a: any) => a.user_id === user.id) ?? null;
      user.pet_adopter = this.adopters.find((a: any) => a.user_id === user.id) ?? null;

      if (user.pet_agency) {
        user.pet_agency.received_applications = [];
        const animals = this.getAnimalsByPetAgencyId(user.pet_agency.id);
        animals.map((a: any) => a.animal_pictures = this.getPicturesByAnimalId(a.id));
        user.pet_agency.animals = animals;
        for (let animal of animals) {
          const applications = this.getApplicationsByAnimalId(animal.id);
          for (let application of applications) {
            application.animal = animal;
            application.animal.animal_pictures = this.getPicturesByAnimalId(animal.id);
            user.pet_agency.received_applications.push(application);
          }
        }
      }

      if (user.pet_adopter) {
        user.pet_adopter.sent_applications = this.applications.filter(a => a.pet_adopter_id === user.pet_adopter.id);
        user.pet_adopter.sent_applications.map((application: any) => {
          application.animal = this.getAnimalById(application.animal_id);
          application.animal.animal_pictures = this.getPicturesByAnimalId(application.animal_id);
        });
      }

      return this.addReviewsToUser(user);

    }

    return null;

  }

  removeAdopterProfile(id: number) {
    const cookieAdopters = this.cookieService.get('adopters');
    const parsedAdopters = cookieAdopters ? JSON.parse(cookieAdopters) : [];
    const updatedAdopters = parsedAdopters.filter((a: any) => a.user_id !== id);
    this.cookieService.set('adopters', JSON.stringify(updatedAdopters), { path: '/' });
  }

  removeAgencyProfile(id: number) {
    const cookieAgencies = this.cookieService.get('agencies');
    const parsedAgencies = cookieAgencies ? JSON.parse(cookieAgencies) : [];
    const updatedAgencies = parsedAgencies.filter((a: any) => a.user_id !== id);
    this.cookieService.set('agencies', JSON.stringify(updatedAgencies), { path: '/' });
  }

  verifyFormData(formData: FormData, rules: any) {
    return this.verifyData(Object.fromEntries(formData.entries()), rules);
  }

  verifyData(data: any, rules: any) {

    const errors = [];

    for (const key in rules) {
      if (!rules[key](data[key])) errors.push(`Invalid value for ${key}`);
    }

    return {
      status: errors.length === 0,
      errors: errors,
    }

  }

}
