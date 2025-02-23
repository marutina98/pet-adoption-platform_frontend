import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Status } from './../../interfaces/status';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-status-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-status-form.component.html',
  styleUrl: './card-update-status-form.component.css'
})
export class CardUpdateStatusFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateStatusFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public status: Status) {}

  ngOnInit() {

    this.form.patchValue({
      name: this.status.name,
      description: this.status.description,
    });

  }

  async submit() {

    this.openSnackBar('Updating Status.');

    const status = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    }

    const response = await this.dataService.adminUpdateStatus(this.status.id, status);

    if (response.ok) {
      this.openSnackBar('Status Successfully Updated.');
    } else {
      this.openSnackBar('Status Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
