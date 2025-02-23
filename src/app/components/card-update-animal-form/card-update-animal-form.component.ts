import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Breed } from './../../interfaces/breed';
import { Animal } from './../../interfaces/animal';
import { Status } from './../../interfaces/status';
import { CoatColor } from './../../interfaces/coat-color';
import { PetAdopter } from './../../interfaces/pet-adopter';

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-animal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-animal-form.component.html',
  styleUrl: './card-update-animal-form.component.css'
})
export class CardUpdateAnimalFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateAnimalFormComponent>);

  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public breeds: Breed[] = [];

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.form.patchValue({
      animal_breed_id: this.data.animal.animal_breed_id,
      animal_coat_color_id: this.data.animal.animal_coat_color_id,
      animal_type_id: this.data.animal.animal_type_id,
      birthdate: this.getDateInCorrectFormat(new Date(this.data.animal.birthdate ?? '')),
      coat_length: this.data.animal.coat_length,
      description: this.data.animal.description,
      name: this.data.animal.name,
      pet_adopter_id: this.data.animal.pet_adopter_id,
      sex: this.data.animal.sex,
      status_id: this.data.animal.status_id,
    });

    this.filterBreeds(this.data.animal.animal_type_id);

    // Filter Breeds when the Type changes

    this.form.valueChanges.subscribe((value) => {
      this.filterBreeds(value.animal_type_id ?? this.data.animal.animal_type_id);
    });

  }

  getDateInCorrectFormat(date: Date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  filterBreeds(typeId: number) {
    this.breeds = this.data.breeds.filter((breed: Breed) => breed.animal_type_id == typeId);
  }

  async submit() {

    this.openSnackBar('Updating Animal.');

    const animal = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      animal_breed_id: this.form.get('animal_breed_id')?.value,
      animal_coat_color_id: this.form.get('animal_coat_color_id')?.value,
      animal_type_id: this.form.get('animal_type_id')?.value,
      birthdate: this.form.get('birthdate')?.value,
      coat_length: this.form.get('coat_length')?.value,
      pet_adopter_id: this.form.get('pet_adopter_id')?.value,
      sex: this.form.get('sex')?.value,
      status_id: this.form.get('status_id')?.value
    };

    const response = await this.dataService.adminUpdateAnimal(this.data.animal.id, animal);

    if (response.ok) {
      this.openSnackBar('Animal Successfully Updated.');
    } else {
      this.openSnackBar('Animal Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
