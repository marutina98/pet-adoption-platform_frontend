import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Interfaces

import { User } from './../../interfaces/user';
import { Type } from './../../interfaces/type';
import { Breed } from './../../interfaces/breed';
import { Animal } from './../../interfaces/animal';
import { Status } from './../../interfaces/status';
import { CoatColor } from './../../interfaces/coat-color';
import { PetAgency } from './../../interfaces/pet-agency';
import { PetAdopter } from './../../interfaces/pet-adopter';
import { AnimalPicture } from './../../interfaces/animal-picture';

// Services

import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Components

import { CardCreateUserFormComponent } from './../card-create-user-form/card-create-user-form.component';
import { CardUpdateUserFormComponent } from './../card-update-user-form/card-update-user-form.component';

import { CardCreateStatusFormComponent } from './../card-create-status-form/card-create-status-form.component';
import { CardUpdateStatusFormComponent } from './../card-update-status-form/card-update-status-form.component';

import { CardUpdateAgencyFormComponent } from './../card-update-agency-form/card-update-agency-form.component';
import { CardUpdateAdopterFormComponent } from './../card-update-adopter-form/card-update-adopter-form.component';

import { CardCreateTypeFormComponent } from './../card-create-type-form/card-create-type-form.component';
import { CardUpdateTypeFormComponent } from './../card-update-type-form/card-update-type-form.component';

import { CardCreateBreedFormComponent } from './../card-create-breed-form/card-create-breed-form.component';
import { CardUpdateBreedFormComponent } from './../card-update-breed-form/card-update-breed-form.component';

import { CardCreateCoatColorFormComponent } from './../card-create-coat-color-form/card-create-coat-color-form.component';
import { CardUpdateCoatColorFormComponent } from './../card-update-coat-color-form/card-update-coat-color-form.component';

import { CardUpdateAnimalFormComponent } from './../card-update-animal-form/card-update-animal-form.component';
import { CardPicturesComponent } from './../card-pictures/card-pictures.component';

import { ConfirmationDialogComponent } from './../dialogs/confirmation-dialog/confirmation-dialog.component';

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule, NgbPaginationModule];

// Material

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const material = [MatDialogModule];

@Component({
  selector: 'app-card-dashboard-administrator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ...bootstrap, ...material],
  templateUrl: './card-dashboard-administrator.component.html',
  styleUrl: './card-dashboard-administrator.component.css'
})
export class CardDashboardAdministratorComponent {

  @Input() users: User[] = [];
  @Input() usersBK: User[] = [];

  // services

  private matDialog: MatDialog = inject(MatDialog);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  // data

  public types: Type[] = [];
  public breeds: Breed[] = [];
  public breedsOG: Breed[] = [];
  public animals: Animal[] = [];
  public animalsOG: Animal[] = [];
  public statuses: Status[] = [];
  public coatColors: CoatColor[] = [];
  public petAgencies: PetAgency[] = [];
  public petAdopters: PetAdopter[] = [];

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  // pagination

  public usersPageSize: number = 10;
  public usersCurrentPage: number = 1;

  public agenciesPageSize: number = 10;
  public agenciesCurrentPage: number = 1;

  public adoptersPageSize: number = 10;
  public adoptersCurrentPage: number = 1;

  public typesPageSize: number = 10;
  public typesCurrentPage: number = 1;

  public breedsPageSize: number = 10;
  public breedsCurrentPage: number = 1;

  public coatColorsPageSize: number = 10;
  public coatColorsCurrentPage: number = 1;

  public statusesPageSize: number = 10;
  public statusesCurrentPage: number = 1;

  public animalsPageSize: number = 10;
  public animalsCurrentPage: number = 1;

  // filter breed by type

  public formBreeds = new FormGroup({
    type: new FormControl(0),
  });

  public formAnimals = new FormGroup({
    sex: new FormControl(-1),
    type: new FormControl(0),
    status: new FormControl(0),
    coatLength: new FormControl(-1),
  });

  // nav

  activeNavTabId: number = 1;

  async ngOnInit() {

    // get needed resources
    // get: agencies, adopters, animal types, animal breeds, animal coat colors, statuses, animals

    await this.getTypes();
    await this.getBreeds();
    await this.getAnimals();
    await this.getAgencies();
    await this.getAdopters();
    await this.getStatuses();
    await this.getCoatColors();

    // filter breeds by type

    this.formBreeds.valueChanges.subscribe((value) => {
      if (value.type) this.filterBreedsByType(value.type);
    });

    this.formAnimals.valueChanges.subscribe((value) => {
      this.filterAnimals(value.type ?? 0, value.status ?? 0, value.sex ?? -1, value.coatLength ?? -1);
    });

  }



  // users

  openCreateUserDialogComponent() {
    const dialogRef = this.matDialog.open(CardCreateUserFormComponent);
    dialogRef.afterClosed().subscribe(async () => {
      await this.getUsers();
    });
  }

  openUpdateUserDialogComponent(user: User) {
    const dialogRef = this.matDialog.open(CardUpdateUserFormComponent, { data: user });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getUsers();
    });
  }

  openDeleteUserConfirmationDialogComponent(user: User) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deleteUser(user);
      await this.getUsers();
    });
  }

  async getUsers() {
    const response = await this.dataService.getUsers();
    const users = await response.json();
    this.users = users;
    this.usersBK = users;
  }

  async deleteUser(user: User) {

    this.openSnackBar('Deleting User.');

    const response = await this.dataService.adminDeleteUser(user.id);

    if (response.ok) {
      this.openSnackBar('User Successfully Deleted.');
    } else {
      this.openSnackBar('User Could Not Be Deleted.');
    }

  }

  // filter users

  showAllUsers() {
    this.users = this.usersBK;
  }

  showAdministrators() {
    this.users = this.usersBK.filter(user => user.is_administrator == 1);
  }

  showPetAdopters() {
    this.users = this.usersBK.filter(user => user.is_pet_adopter == 1);
  }

  showPetAgencies() {
    this.users = this.usersBK.filter(user => user.is_pet_agency == 1);
  }


  // agencies and adopters

  openUpdateAgencyDialogComponent(agency: PetAgency) {
    const dialogRef = this.matDialog.open(CardUpdateAgencyFormComponent, { data: agency });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getAgencies();
    });
  }

  openUpdateAdopterDialogComponent(adopter: PetAdopter) {
    const dialogRef = this.matDialog.open(CardUpdateAdopterFormComponent, { data: adopter });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getAdopters();
    });
  }

  getAgencyById(id: number) {
    return this.petAgencies.find((agency: PetAgency) => agency.id == id);
  }

  getAdopterById(id: number|null) {
    return id ? this.petAdopters.find((adopter: PetAdopter) => adopter.id == id) : null;
  }

  async getAgencies() {
    const response = await this.dataService.getPetAgencies();
    this.petAgencies = await response.json();
  }

  async getAdopters() {
    const response = await this.dataService.getPetAdopters();
    this.petAdopters = await response.json();
  }


  // types

  openCreateTypeDialogComponent() {
    const dialogRef = this.matDialog.open(CardCreateTypeFormComponent);
    dialogRef.afterClosed().subscribe(async () => {
      await this.getTypes();
    });
  }

  openUpdateTypeDialogComponent(type: Type) {
    const dialogRef = this.matDialog.open(CardUpdateTypeFormComponent, { data: type });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getTypes();
    });
  }

  openDeleteTypeConfirmationDialogComponent(type: Type) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deleteType(type);
      await this.getTypes();
    });
  }

  getTypeById(id: number) {
    return this.types.find((type: Type) => type.id == id);
  }

  async deleteType(type: Type) {
    this.openSnackBar('Deleting Type.');

    const response = await this.dataService.adminDeleteType(type.id);

    if (response.ok) {
      this.openSnackBar('Type Successfully Deleted.');
    } else {
      this.openSnackBar('Type Could Not Be Deleted.');
    }
  }

  async getTypes() {
    const response = await this.dataService.getTypes();
    this.types = await response.json();
  }

  // breeds

  openCreateBreedDialogComponent() {
    const dialogRef = this.matDialog.open(CardCreateBreedFormComponent, { data: this.types });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getBreeds();
    });
  }

  openUpdateBreedDialogComponent(breed: Breed) {
    const data = { types: this.types, breed: breed };
    const dialogRef = this.matDialog.open(CardUpdateBreedFormComponent, { data: data });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getBreeds();
    });
  }

  openDeleteBreedConfirmationDialogComponent(breed: Breed) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deleteBreed(breed);
      await this.getBreeds();
    });
  }

  getBreedById(id: number) {
    return this.breedsOG.find((breed: Breed) => breed.id == id);
  }

  async deleteBreed(breed: Breed) {
    this.openSnackBar('Deleting Breed.');

    const response = await this.dataService.adminDeleteBreed(breed.id);

    if (response.ok) {
      this.openSnackBar('Breed Successfully Deleted.');
    } else {
      this.openSnackBar('Breed Could Not Be Deleted.');
    }
  }

  async getBreeds() {
    const response = await this.dataService.getAnimalBreeds();
    const breeds = await response.json();
    this.breeds = breeds;
    this.breedsOG = breeds;
  }

  filterBreedsByType(id: number) {
    this.breeds = id === 0 ? this.breedsOG :
                             this.breedsOG.filter((breed: Breed) => breed.animal_type_id == id);
  }

  // statuses

  openCreateStatusDialogComponent() {
    const dialogRef = this.matDialog.open(CardCreateStatusFormComponent);
    dialogRef.afterClosed().subscribe(async () => {
      await this.getStatuses();
    });
  }

  openUpdateStatusDialogComponent(status: Status) {
    const dialogRef = this.matDialog.open(CardUpdateStatusFormComponent, { data: status });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getStatuses();
    });
  }

  openDeleteStatusConfirmationDialogComponent(status: Status) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deleteStatus(status);
      await this.getStatuses();
    });
  }

  getStatusById(id: number) {
    return this.statuses.find((status: Status) => status.id == id);
  }

  async getStatuses() {
    const response = await this.dataService.getStatuses();
    this.statuses = await response.json();
  }

  async deleteStatus(status: Status) {

    this.openSnackBar('Deleting Status.');

    const response = await this.dataService.adminDeleteStatus(status.id);

    if (response.ok) {
      this.openSnackBar('Status Successfully Deleted.');
    } else {
      this.openSnackBar('Status Could Not Be Deleted.');
    }

  }



  // animals

  openUpdateAnimalDialogComponent(animal: Animal) {

    const data = {
      statuses: this.statuses,
      types: this.types,
      breeds: this.breeds,
      coatColors: this.coatColors,
      animal: animal,
      petAdopters: this.petAdopters,
    };

    const dialogRef = this.matDialog.open(CardUpdateAnimalFormComponent, { data: data });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getAnimals();
    });

  }

  openDeleteAnimalConfirmationDialogComponent(animal: Animal) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deleteAnimal(animal);
      await this.getAnimals();
    });
  }

  async deleteAnimal(animal: Animal) {

    this.openSnackBar('Deleting Animal.');
    const response = await this.dataService.adminDeleteAnimal(animal.id);

    if (response.ok) {
      this.openSnackBar('Animal Successfully Deleted.');
    } else {
      this.openSnackBar('Animal Could Not Be Deleted.');
    }

  }

  async getAnimals() {
    const response = await this.dataService.getAnimals();
    const animals = await response.json();
    this.animals = animals;
    this.animalsOG = animals;
  }

  viewCardPictures(animalId: number, pictures: AnimalPicture[]) {
    const data = { animalId: animalId, pictures: pictures }
    const dialogRef = this.matDialog.open(CardPicturesComponent, {data: data});
    dialogRef.afterClosed().subscribe(async () => {
      await this.getAnimals();
    });
  }

  filterAnimals(typeId: number, statusId: number, sex: number, coatLength: number) {
    this.animals = this.animalsOG.filter((animal: Animal) => {
      const matchesType = typeId == 0 || animal.animal_type_id == typeId;
      const matchesStatus = statusId == 0 || animal.status_id == statusId;
      const matchesSex = sex == -1 || animal.sex == sex;
      const matchesCoatLength = coatLength == -1 || animal.coat_length == coatLength;
      return matchesType && matchesStatus && matchesSex && matchesCoatLength;
    });
  }



  // coat colors

  openCreateCoatColorDialogComponent() {
    const dialogRef = this.matDialog.open(CardCreateCoatColorFormComponent);
    dialogRef.afterClosed().subscribe(async () => {
      await this.getCoatColors();
    });
  }

  openUpdateCoatColorDialogComponent(coatColor: CoatColor) {
    const dialogRef = this.matDialog.open(CardUpdateCoatColorFormComponent, { data: coatColor });
    dialogRef.afterClosed().subscribe(async () => {
      await this.getCoatColors();
    });
  }

  openDeleteCoatColorConfirmationDialogComponent(coatColor: CoatColor) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(async (confirmation) => {
      if (confirmation) await this.deleteCoatColor(coatColor);
      await this.getCoatColors();
    });
  }

  getCoatColorById(id: number) {
    return this.coatColors.find((color: CoatColor) => color.id == id);
  }

  async getCoatColors() {
    const response = await this.dataService.getAnimalCoatColors();
    this.coatColors = await response.json();
  }

  async deleteCoatColor(coatColor: CoatColor) {

    this.openSnackBar('Deleting Coat Color.');

    const response = await this.dataService.adminDeleteCoatColor(coatColor.id);

    if (response.ok) {
      this.openSnackBar('Coat Color Successfully Deleted.');
    } else {
      this.openSnackBar('Coat Color Could Not Be Deleted.');
    }

  }

  // snackbar

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

  getDate(_date: string) {
    return new Date(_date).toISOString().split('T')[0];
  }

  // misc

  getAnimalSex(sex: number) {
    return sex === 0 ? 'Male' : 'Female';
  }

  getAnimalCoatLength(length: number) {

    let label;

    switch (length) {

      case 0:
        label = 'Short';
        break;

      case 1:
        label = 'Medium';
        break;

      case 2:
        label = 'Long';
        break;

    }

    return label;

  }

}
