import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Type } from './../../interfaces/type';
import { Breed } from './../../interfaces/breed';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-breed-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-breed-form.component.html',
  styleUrl: './card-update-breed-form.component.css'
})
export class CardUpdateBreedFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateBreedFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl(1, [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.form.patchValue({
      name: this.data.breed.name,
      description: this.data.breed.description,
      type: this.getTypeById(this.data.breed.animal_type_id).id,
    });

  }

  getTypeById(id: number) {
    return this.data.types.find((type: Type) => type.id == id);
  }

  async submit() {

    this.openSnackBar('Updating Breed.');

    const breed = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      animal_type_id: this.form.get('type')?.value,
    }

    const response = await this.dataService.adminUpdateBreed(this.data.breed.id, breed);

    if (response.ok) {
      this.openSnackBar('Breed Successfully Updated.');
    } else {
      this.openSnackBar('Breed Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
