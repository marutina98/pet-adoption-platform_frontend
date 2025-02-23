import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { PetAdopter } from './../../interfaces/pet-adopter';
import { FormEntry } from './../../interfaces/form-entry';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-adopter-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-adopter-form.component.html',
  styleUrl: './card-update-adopter-form.component.css'
})
export class CardUpdateAdopterFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateAdopterFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    picture: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  private pictureFile: File|null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public adopter: PetAdopter) {}

  ngOnInit() {

    this.form.patchValue({
      name: this.adopter.name,
      phone: this.adopter.phone,
      address: this.adopter.address,
    });

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.pictureFile = input.files[0];
  }

  async submit() {
    
    // create formdata

    const formData: FormData = new FormData();

    // append form values to formData

    formData.append('name', this.form.value.name ?? '');
    formData.append('phone', this.form.value.phone ?? '');
    formData.append('address', this.form.value.address ?? '');

    if (this.pictureFile) formData.append('picture', this.pictureFile);

    // view formdata content

    const formEntries: FormEntry[] = [];

    formData.forEach((value, key) => {
      formEntries.push({ key, value: value.toString() });
    });

    // send formdata

    this.openSnackBar('Updating Adopter.');

    const response = await this.dataService.adminUpdateAdopter(this.adopter.id, formData);
    const data = await response.json();
    
    if (response.ok) {
      this.openSnackBar('Adopter Successfully Updated.');
    } else {
      this.openSnackBar('Adopter Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
