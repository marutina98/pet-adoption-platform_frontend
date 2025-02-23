import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { PetAgency } from './../../interfaces/pet-agency';
import { FormEntry } from './../../interfaces/form-entry';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-agency-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-agency-form.component.html',
  styleUrl: './card-update-agency-form.component.css'
})
export class CardUpdateAgencyFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateAgencyFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public regex = '/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi';

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required, Validators.pattern(this.regex)]),
    picture: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  private pictureFile: File|null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public agency: PetAgency) {}

  ngOnInit() {

    this.form.patchValue({
      name: this.agency.name,
      description: this.agency.description,
      website: this.agency.website,
      phone: this.agency.phone,
      address: this.agency.address,
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
    formData.append('website', this.form.value.website ?? '');
    formData.append('description', this.form.value.description ?? '');

    if (this.pictureFile) formData.append('picture', this.pictureFile);

    // view formdata content

    const formEntries: FormEntry[] = [];

    formData.forEach((value, key) => {
      formEntries.push({ key, value: value.toString() });
    });

    // send formdata

    this.openSnackBar('Updating Agency.');

    const response = await this.dataService.adminUpdateAgency(this.agency.id, formData);
    const data = await response.json();
    
    if (response.ok) {
      this.openSnackBar('Agency Successfully Updated.');
    } else {
      this.openSnackBar('Agency Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
