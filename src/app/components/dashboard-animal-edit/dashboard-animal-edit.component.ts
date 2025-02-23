import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Interfaces

import { Type } from './../../interfaces/type';
import { Breed } from './../../interfaces/breed';
import { Animal } from './../../interfaces/animal';
import { Status } from './../../interfaces/status';
import { CoatColor } from './../../interfaces/coat-color';
import { PetAdopter } from './../../interfaces/pet-adopter';

// Services

import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Components

import { ConfirmationDialogComponent } from './../dialogs/confirmation-dialog/confirmation-dialog.component';

// Material

import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const material = [MatDialogModule];

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule];

@Component({
  selector: 'app-dashboard-animal-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...material, ...bootstrap],
  templateUrl: './dashboard-animal-edit.component.html',
  styleUrl: './dashboard-animal-edit.component.css'
})
export class DashboardAnimalEditComponent {

  // Services

  private router: Router = inject(Router);
  private matDialog: MatDialog = inject(MatDialog);
  private dataService: DataService = inject(DataService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  // Storage URL

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  // Data

  public animal: Animal|null = null;

  public allBreeds: Breed[] = [];

  public breeds: Breed[] = [];
  public statuses: Status[] = [];
  public coatColors: CoatColor[] = [];
  public petAdopters: PetAdopter[] = [];

  public types: Type[] = [];
  public sexes: String[] = ['Male', 'Female'];
  public coatLengths: String[] = ['Short', 'Medium', 'Long'];

  // Nav

  public activeTabId: number = 1;

  // Form

  public form = new FormGroup({
    animal_breed_id: new FormControl(0),
    animal_coat_color_id: new FormControl(0),
    animal_type_id: new FormControl(0),
    birthdate: new FormControl(this.getDateInCorrectFormat()),
    coat_length: new FormControl(0),
    description: new FormControl(''),
    name: new FormControl(''),
    pet_adopter_id: new FormControl(0),
    sex: new FormControl(0),
    status_id: new FormControl(0),
  });

  async ngOnInit() {

    // Get Types

    const responseTypes = await this.activatedRoute.snapshot.data['types'];
    if (responseTypes.ok) this.types = await responseTypes.json();

    // Get Animal from Resolver
    
    const responseAnimal = await this.activatedRoute.snapshot.data['animal'];
    if (responseAnimal.ok) this.animal = await responseAnimal.json();

    // Get Animal Breeds

    const responseAnimalBreeds = await this.activatedRoute.snapshot.data['animalBreeds'];
    if (responseAnimalBreeds.ok) this.allBreeds = await responseAnimalBreeds.json();

    // Get Animal Coat Colors

    const responseCoatColors = await this.activatedRoute.snapshot.data['animalCoatColors'];
    if (responseCoatColors.ok) this.coatColors = await responseCoatColors.json();

    // Get Statuses

    const responseStatuses = await this.activatedRoute.snapshot.data['statuses'];
    if (responseStatuses.ok) this.statuses = await responseStatuses.json();

    // Get Pet Adopters

    const responsePetAdopters = await this.activatedRoute.snapshot.data['petAdopters'];
    if (responsePetAdopters.ok) this.petAdopters = await responsePetAdopters.json();

    // Filter Animal Breeds

    this.filterBreeds(this.animal!.animal_type_id);

    // Init Form

    this.form.patchValue({
      animal_breed_id: this.animal?.animal_breed_id,
      animal_coat_color_id: this.animal?.animal_coat_color_id,
      animal_type_id: this.animal?.animal_type_id,
      birthdate: this.getDateInCorrectFormat(new Date(this.animal?.birthdate ?? '')),
      coat_length: this.animal?.coat_length,
      description: this.animal?.description,
      name: this.animal?.name,
      pet_adopter_id: this.animal?.pet_adopter_id,
      sex: this.animal?.sex,
      status_id: this.animal?.status_id,
    });

    // Filter breeds again when the animal type changes

    const type = this.form.get('animal_type_id');

    if (type) type.valueChanges.subscribe((t) => {

      // filter breeds and set first breed as breed

      if (t) {

        this.filterBreeds(Number(t));

        // check if the new animal_breed_id is the same
        // of the animal

        const isSameType = this.animal?.animal_type_id === Number(t);
        const breedId = isSameType ? this.animal?.animal_breed_id : this.breeds[0].id;

        // set value

        this.form.patchValue({ animal_breed_id: breedId });

      }

    });

    console.log('UPDATE');
    console.log(this.animal);

  }

  getDateInCorrectFormat(date: Date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  filterBreeds(typeId: number) {
    this.breeds = this.allBreeds.filter((breed) => breed.animal_type_id == typeId);
  }

  async updateAnimal() {

    const body = {
      animal_breed_id: this.form.get('animal_breed_id')?.value,
      animal_coat_color_id: this.form.get('animal_coat_color_id')?.value,
      animal_type_id: this.form.get('animal_type_id')?.value,
      birthdate: new Date(this.form.get('birthdate')?.value ?? ''),
      coat_length: this.form.get('coat_length')?.value,
      description: this.form.get('description')?.value,
      name: this.form.get('name')?.value,
      pet_adopter_id: this.form.get('pet_adopter_id')?.value,
      sex: this.form.get('sex')?.value,
      status_id: this.form.get('status_id')?.value,
    }

    // update animal

    const updateResponse = await this.dataService.updateAnimal(this.animal!.id, body);

    console.log(updateResponse);

    // refetch animal

    await this.fetchAnimal();

  }

  async deletePicture(id: number) {

    // delete picture and refetch animal

    await this.dataService.deleteAnimalPicture(id);
    await this.fetchAnimal();

  }

  async fetchAnimal() {

    // fetch animal again after a change

    const response = await this.dataService.getAnimal(this.animal!.id);
    if (response.ok) this.animal = await response.json();

    // filter breeds

    this.filterBreeds(this.animal!.animal_type_id);

  }

  openConfirmationDialogUpdateAnimal() {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) this.updateAnimal();
    });
  }

  openConfirmationDialogDeleteAnimalPicture(id: number) {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) this.deletePicture(id);
    });
  }

}
