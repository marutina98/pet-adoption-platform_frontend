import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Services

import { AuthService } from './../../../services/auth.service';

// Material Design

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-pet-adopter',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registration-pet-adopter.component.html',
  styleUrl: './registration-pet-adopter.component.css'
})
export class RegistrationPetAdopterComponent {

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  public form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // on submit attempt to register the user
  // if successful, create a cookie with the token
  // set the isLogged status to true

  async onSubmit() {

    // register body request

    const body = {
      'email': this.form.get('email')?.value ?? '',
      'password': this.form.get('password')?.value ?? '',
    };

    // register the user as pet adopter

    const response = await this.authService.registratePetAdopter(body);

    // snackbar for signing up
    this.openSnackBar('You are signing up.');

    if (response.ok) {
      
      // if successful, create a cookie with the token and
      // set the isAuthenticated status to true and go back to homepage

      const data = await response.json();

      // snackbar for being logged in
      this.openSnackBar('You are logged in.');

      this.authService.setTokenCookie(data.token, data.user.email, data.user.id);
      this.authService.isAuthenticated.next(true);
      this.authService.authenticatedUser = data.user;
      this.router.navigate(['/']);

    }

  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
