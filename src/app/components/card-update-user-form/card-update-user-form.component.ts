import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface UserType {
  label: string,
  value: string,
}

import { User } from './../../interfaces/user';

import { DataService } from './../../services/data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-update-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-update-user-form.component.html',
  styleUrl: './card-update-user-form.component.css'
})
export class CardUpdateUserFormComponent {

  private matDialogRef = inject(MatDialogRef<CardUpdateUserFormComponent>);

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
    userType: new FormControl(this.userTypes[0].value)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public user: User) {}

  ngOnInit() {

    this.form.patchValue({
      email: this.user.email,
      userType: this.getUserType(this.user),
    });

  }

  async submit() {

    const user = {
      email: this.form.get('email')?.value,
      is_administrator: false,
      is_pet_adopter: false,
      is_pet_agency: false,
    }

    const userType = this.form.get('userType')?.value as 'is_administrator' | 'is_pet_adopter' | 'is_pet_agency';
    user[userType] = true;

    // snackbar before creating user
    // send user to server

    this.openSnackBar('Updating User.');

    const response = await this.dataService.adminUpdateUser(this.user.id, user);

    if (response.ok) {
      this.openSnackBar('User Successfully Updated.');
    } else {
      this.openSnackBar('User Could Not Be Updated.');
    }

    this.matDialogRef.close();

  }

  getUserType(user: User) {
    for (const userType of this.userTypes) {
      if (user[userType.value as keyof typeof user]) return userType.value;
    }

    return;
  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
