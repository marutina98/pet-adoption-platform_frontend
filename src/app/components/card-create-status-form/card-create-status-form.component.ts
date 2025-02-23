import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-create-status-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-create-status-form.component.html',
  styleUrl: './card-create-status-form.component.css'
})
export class CardCreateStatusFormComponent {

  private matDialogRef = inject(MatDialogRef<CardCreateStatusFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  async submit() {

    this.openSnackBar('Creating Status.');

    const status = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    }

    const response = await this.dataService.adminCreateStatus(status);

    if (response.ok) {
      this.openSnackBar('Status Successfully Created.');
    } else {
      this.openSnackBar('Status Could Not Be Created.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
