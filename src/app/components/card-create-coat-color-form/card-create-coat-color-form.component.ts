import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { CoatColor } from './../../interfaces/coat-color';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-create-coat-color-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-create-coat-color-form.component.html',
  styleUrl: './card-create-coat-color-form.component.css'
})
export class CardCreateCoatColorFormComponent {

  private matDialogRef = inject(MatDialogRef<CardCreateCoatColorFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  async submit() {

    this.openSnackBar('Creating Coat Color.');

    const color = {
      name: this.form.get('name')?.value,
      hex_color: this.form.get('color')?.value,
    }

    const response = await this.dataService.adminCreateCoatColor(color);

    if (response.ok) {
      this.openSnackBar('Coat Color Successfully Created.');
    } else {
      this.openSnackBar('Coat Color Could Not Be Created.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
