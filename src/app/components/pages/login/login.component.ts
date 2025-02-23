import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Services

import { AuthService } from './../../../services/auth.service';

// Material Design

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  public form = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // on submit attempt to authenticate the user
  // if successful, create a cookie with the token
  // set the isLogged status to true

  async onSubmit() {

    // login body request

    const body = {
      'email': this.form.get('email')?.value ?? '',
      'password': this.form.get('password')?.value ?? '',
    };

    // register the user as pet adopter

    const response = await this.authService.authenticate(body);

    // open snackbar to indicate that the user is now logging in.

    this.openSnackBar('You are logging in.');

    if (response.ok) {

      // open snackbar to indicate that the user is now logged.

      this.openSnackBar('You are now logged in.');
      
      // if successful, create a cookie with the token and
      // set the isAuthenticated status to true and go back to homepage

      const data = await response.json();

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
