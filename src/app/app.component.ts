import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';
import { isEmpty } from 'rxjs';

// Interfaces

import { User } from './interfaces/user';

// Services

import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

import { MockApiService } from './services/api/mock-api.service';

// Components

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const components = [HeaderComponent, FooterComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...components],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public router: Router = inject(Router);
  
  private dataService: DataService = inject(DataService);
  private authService: AuthService = inject(AuthService);
  private mock: MockApiService = inject(MockApiService);

  public isAuthenticated: Boolean = false;

  async ngOnInit() {

    // subscribe to the isAuthenticated Subject and to user
    this.authService.isAuthenticated.subscribe((status: Boolean) => this.isAuthenticated = status);

    // check if user is logged at each init
    this.authService.isAuthenticated.next(this.authService.checkTokenCookie());

    // if the user is logged, and there is no authenticatedUser fetch it

    const isAuthenticatedUserLoaded = this.authService.isAuthenticatedUserLoaded();

    if (this.isAuthenticated && !isAuthenticatedUserLoaded) {
      const response = await this.authService.getAuthenticatedUser();
      if (response.ok) this.authService.authenticatedUser = await response.json();
    }

  }

}
