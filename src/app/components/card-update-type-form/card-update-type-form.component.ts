import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Type } from './../../interfaces/type';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-type-form.component.html',
  styleUrl: './card-update-type-form.component.css'
})
export class CardUpdateTypeFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateTypeFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public type: Type) {}

  ngOnInit() {
    this.form.patchValue({
      name: this.type.name,
      description: this.type.description,
    });
  }

  async submit() {

    const type = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
    }

    // snackbar before updating type
    // send type to server

    this.openSnackBar('Updating Type.');

    const response = await this.dataService.adminUpdateType(this.type.id, type);

    if (response.ok) {
      this.openSnackBar('Type Successfully Updated.');
    } else {
      this.openSnackBar('Type Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
