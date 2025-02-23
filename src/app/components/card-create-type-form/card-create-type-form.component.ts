import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-create-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-create-type-form.component.html',
  styleUrl: './card-create-type-form.component.css'
})
export class CardCreateTypeFormComponent {

  private matDialogRef = inject(MatDialogRef<CardCreateTypeFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  async submit() {

    const type = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    }

    // snackbar before creating type
    // send type to server

    this.openSnackBar('Creating Type.');

    const response = await this.dataService.adminCreateType(type);

    if (response.ok) {
      this.openSnackBar('Type Successfully Created.');
    } else {
      this.openSnackBar('Type Could Not Be Created.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
