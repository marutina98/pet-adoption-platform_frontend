import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Type } from './../../interfaces/type';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-create-breed-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-create-breed-form.component.html',
  styleUrl: './card-create-breed-form.component.css'
})
export class CardCreateBreedFormComponent {

  private matDialogRef = inject(MatDialogRef<CardCreateBreedFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl(1, [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public types: Type[]) {}

  async submit() {

    this.openSnackBar('Creating Breed.');

    const breed = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      animal_type_id: this.form.get('type')?.value,
    }

    const response = await this.dataService.adminCreateBreed(breed);

    if (response.ok) {
      this.openSnackBar('Breed Successfully Created.');
    } else {
      this.openSnackBar('Breed Could Not Be Created.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
