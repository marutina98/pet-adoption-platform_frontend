
import { Routes } from '@angular/router';

// Constants

const websiteName: string = 'Paws and Whiskers';

// Resolvers

import {
  getPendingReviews,
  getUsers,
  getTypes,
  getPetAdopters,
  getAnimal,
  getAnimalCoatColorsResolver,
  getAnimalBreeds,
  getStatuses,
} from './../resolvers/data.resolver';

// Guards

import {
  isAuthenticatedUserGuard,
  isGuestUserGuard,
  isPetAgency,
  isAnimalAuthor
} from './../guards/auth.guard';

// Components

import { DashboardComponent } from './../components/pages/dashboard/dashboard.component';
import { DashboardAnimalEditComponent } from './../components/dashboard-animal-edit/dashboard-animal-edit.component';
import { DashboardAnimalCreateComponent} from './../components/dashboard-animal-create/dashboard-animal-create.component';

// Routes

export const dashboardRoutes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [isAuthenticatedUserGuard],
    resolve: {
      users: getUsers,
      pendingReviews: getPendingReviews,
    }
  },

  {
    path: 'dashboard/create/animal',
    component: DashboardAnimalCreateComponent,
    canActivate: [isAuthenticatedUserGuard, isPetAgency],
    resolve: {
      types: getTypes,
      animalBreeds: getAnimalBreeds,
      animalCoatColors: getAnimalCoatColorsResolver,
    }
  },

  {
    path: 'dashboard/edit/animal/:id',
    component: DashboardAnimalEditComponent,
    canActivate: [isAuthenticatedUserGuard, isAnimalAuthor],
    resolve: {
      types: getTypes,
      animal: getAnimal,
      animalBreeds: getAnimalBreeds,
      animalCoatColors: getAnimalCoatColorsResolver,
      statuses: getStatuses,
      petAdopters: getPetAdopters,
    },
  },

];

