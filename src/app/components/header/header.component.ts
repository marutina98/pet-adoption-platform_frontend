import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Interfaces

import { User } from './../../interfaces/user';

// Services

import { AuthService } from './../../services/auth.service';

// Components

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbDropdownModule, NgbCarouselModule];

// Material Design

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ...bootstrap],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: []
})
export class HeaderComponent {

  @Input() isAuthenticated: Boolean = false;

  // Services

  public router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  // Images

  public logo: string = '/assets/images/header/pawprint-paw-svgrepo-com.svg';

  public images: string[] = [
    '/assets/images/header/alvan-nee-lvFlpqEvuRM-unsplash.jpg',
    '/assets/images/header/angel-luciano-LATYeZyw88c-unsplash.jpg',
    '/assets/images/header/anna-dudkova-urs_y9NwFcc-unsplash.jpg',
    '/assets/images/header/erik-jan-leusink-IbPxGLgJiMI-unsplash.jpg',
    '/assets/images/header/michael-sum-LEpfefQf4rU-unsplash.jpg',
    '/assets/images/header/okeykat-w6elADh_jww-unsplash.jpg',
    '/assets/images/header/thapanee-srisawat-byV33HkMneM-unsplash.jpg',
  ];

  // Nav Links

  public navLinks: any[] = [

    {
      routerLink: ['/'],
      text: 'Homepage',
    },

    {
      routerLink: ['/about-us'],
      text: 'About Us'
    },

    {
      routerLink: ['/browse/view/agencies'],
      text: 'View Agencies'
    },

  ];

  async logout() {

    const response = await this.authService.logout();

    // snackbar to indicate the user is logging out
    this.openSnackBar('You are logging out.');

    if (response.ok) {

      // snackbar to indicate the user is logged out
      this.openSnackBar('You are logged out.');

      this.authService.removeTokenCookie();
      this.authService.isAuthenticated.next(false);
      this.authService.authenticatedUser = null;
      this.router.navigate(['/']);

    }
  }

  openSnackBar(text: string, durationInSeconds: number = 5) {
    this.matSnackBar.open(text, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

}
