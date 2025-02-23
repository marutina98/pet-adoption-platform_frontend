import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { CoatColor } from './../../interfaces/coat-color';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-coat-color-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-coat-color-form.component.html',
  styleUrl: './card-update-coat-color-form.component.css'
})
export class CardUpdateCoatColorFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateCoatColorFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public coatColor: CoatColor) {}

  ngOnInit() {

    this.form.patchValue({
      name: this.coatColor.name,
      color: this.coatColor.hex_color,
    });

  }

  async submit() {

    this.openSnackBar('Updating Coat Color.');

    const color = {
      name: this.form.get('name')?.value,
      hex_color: this.form.get('color')?.value,
    }

    const response = await this.dataService.adminUpdateCoatColor(this.coatColor.id, color);

    if (response.ok) {
      this.openSnackBar('Coat Color Successfully Updated.');
    } else {
      this.openSnackBar('Coat Color Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
