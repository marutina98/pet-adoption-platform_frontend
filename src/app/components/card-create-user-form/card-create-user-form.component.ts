import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface UserType {
  label: string,
  value: string,
}

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './card-create-user-form.component.html',
  styleUrl: './card-create-user-form.component.css'
})
export class CardCreateUserFormComponent {
  
  private matDialogRef = inject(MatDialogRef<CardCreateUserFormComponent>);

  private matSnackBar: MatSnackBar = inject(MatSnackBar);
  private dataService: DataService = inject(DataService);

  public userTypes: UserType[] = [

    {
      label: 'Administrator',
      value: 'is_administrator'
    },

    {
      label: 'Pet Adopter',
      value: 'is_pet_adopter'
    },

    {
      label: 'Pet Agency',
      value: 'is_pet_agency'
    },

  ];

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    userType: new FormControl(this.userTypes[0].value)
  });

  async submit() {

    const user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      is_administrator: false,
      is_pet_adopter: false,
      is_pet_agency: false,
    }

    const userType = this.form.get('userType')?.value as 'is_administrator' | 'is_pet_adopter' | 'is_pet_agency';
    user[userType] = true;

    // snackbar before creating user
    // send user to server

    this.openSnackBar('Creating User.');

    const response = await this.dataService.adminCreateUser(user);

    if (response.ok) {
      this.openSnackBar('User Successfully Created.');
    } else {
      this.openSnackBar('User Could Not Be Created.');
    }

    this.matDialogRef.close();

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
