import { Routes } from '@angular/router';

// Resolvers

import {
  getPetAgencies,
  getPetAdopterById,
  getPetAgencyById,
  getAnimal,
  getAnimals,
  getAnimalsByTypeResolver,
  getAnimalCoatColorsResolver,
  getAnimalBreedsByTypeResolver,
  getStatuses,
} from './resolvers/data.resolver';

import {
  getAnimalTitle,
  getPetAgencyTitle,
  getPetAdopterTitle,
} from './resolvers/title.resolver';

// Guards

import {
  isAuthenticatedUserGuard,
  isGuestUserGuard,
  isPetAgency,
  isAnimalAuthor
} from './guards/auth.guard';

// Components

import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';

import { BrowseAnimalsComponent } from './components/pages/browse-animals/browse-animals.component';
import { BrowseAgenciesComponent } from './components/pages/browse-agencies/browse-agencies.component';
import { ViewAnimalComponent } from './components/pages/view-animal/view-animal.component';
import { ViewAdopterComponent } from './components/pages/view-adopter/view-adopter.component';
import { ViewAgencyComponent } from './components/pages/view-agency/view-agency.component';

// Settings

const websiteName: string = 'Paws and Whiskers';

// Routes

import { dashboardRoutes } from './routes/dashboard.routes';
import { authenticationRoutes } from './routes/authentication.routes';

export const routes: Routes = [

  {
    path: '',
    component: HomepageComponent,
    title: 'Homepage - ' + websiteName,
    resolve: {
      agencies: getPetAgencies,
      animals: getAnimals,
    }
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
    title: 'About Us - ' + websiteName,
  },

  {
    path: 'browse/type/:type',
    component: BrowseAnimalsComponent,
    title: 'Browse Animals by Type - ' + websiteName,
    resolve: {
      animals: getAnimalsByTypeResolver,
      animalBreeds: getAnimalBreedsByTypeResolver,
      animalCoatColors: getAnimalCoatColorsResolver,
      statuses: getStatuses,
    }
  },

  {
    path: 'browse/view/agencies',
    component: BrowseAgenciesComponent,
    title: 'Browse all the Agencies - ' + websiteName,
    resolve: {
      agencies: getPetAgencies,
    }
  },

  {
    path: 'browse/view/animal/:id',
    component: ViewAnimalComponent,
    title: getAnimalTitle,
    resolve: {
      animal: getAnimal
    }
  },

  {
    path: 'browse/view/agency/:id',
    component: ViewAgencyComponent,
    title: getPetAgencyTitle,
    resolve: {
      agency: getPetAgencyById,
      statuses: getStatuses,
    }
  },

  {
    path: 'browse/view/adopter/:id',
    component: ViewAdopterComponent,
    title: getPetAdopterTitle,
    resolve: {
      adopter: getPetAdopterById,
    }
  },

  ...dashboardRoutes,
  ...authenticationRoutes,

];
