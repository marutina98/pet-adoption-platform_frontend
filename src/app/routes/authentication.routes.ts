
import { Routes } from '@angular/router';

// Constants

const websiteName: string = 'Paws and Whiskers';

// Guards

import { isGuestUserGuard } from './../guards/auth.guard';

// Components

import { LoginComponent } from './../components/pages/login/login.component';
import { RegistrationComponent } from './../components/pages/registration/registration.component';
import { RegistrationPetAgencyComponent } from './../components/pages/registration-pet-agency/registration-pet-agency.component';
import { RegistrationPetAdopterComponent } from './../components/pages/registration-pet-adopter/registration-pet-adopter.component';

export const authenticationRoutes: Routes = [

  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration - ' + websiteName,
    canActivate: [isGuestUserGuard],
  },

  {
    path: 'registration/agency',
    component: RegistrationPetAgencyComponent,
    title: 'Registration - Pet Agency - ' + websiteName,
    canActivate: [isGuestUserGuard],
  },

  {
    path: 'registration/adopter',
    component: RegistrationPetAdopterComponent,
    title: 'Registration - Pet Adopter - ' + websiteName,
    canActivate: [isGuestUserGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - ' + websiteName,
    canActivate: [isGuestUserGuard],
  },

];
