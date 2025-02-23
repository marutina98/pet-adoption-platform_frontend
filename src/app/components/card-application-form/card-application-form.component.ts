import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Interfaces

import { User } from './../../interfaces/user';

// Services

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';

// Material Design

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-application-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-application-form.component.html',
  styleUrl: './card-application-form.component.css'
})
export class CardApplicationFormComponent {

  // Input

  @Input() animalId: number = 0;
  @Input() authenticatedUser: User|null = null;

  // Services

  private dataService: DataService = inject(DataService);
  private authService: AuthService = inject(AuthService);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  // Form

  private phoneRegex: string = '^[- +()0-9]+$';

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(this.phoneRegex)]),
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit() {

    // Update Values in Form

    this.form.patchValue({
      name: this.authenticatedUser?.pet_adopter?.name ?? '',
      email: this.authenticatedUser?.email ?? '',
      phone: this.authenticatedUser?.pet_adopter?.phone ?? '',
    });

  }

  // Form Submit

  async onSubmit() {

    // snackbar to indicate that the application is being sent
    this.openSnackBar('Your application is being sent to our server.');

    const response = await this.dataService.addApplication(this.animalId, {
      name: this.form.get('name')?.value ?? '',
      email: this.form.get('email')?.value ?? '',
      phone: this.form.get('phone')?.value ?? '',
      message: this.form.get('message')?.value ?? '',
    });

    if (response.ok) {
      // snackbar to indicate that the application was received.
      this.openSnackBar('Your application was received.');
      const data = await response.json();
    }
    
  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
