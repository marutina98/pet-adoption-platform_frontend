import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, BehaviorSubject } from 'rxjs';

// Interfaces

import { User } from './../interfaces/user';
import { LoginRequestBody } from './../interfaces/api/login-request-body';
import { RegistrationRequestBody } from './../interfaces/api/registration-request-body';

// Services

import { BridgeApiService } from './api/bridge-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Services

  private cookie: CookieService = inject(CookieService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public isAuthenticated: Subject<Boolean> = new Subject<Boolean>();

  private _authenticatedUser: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  // API

  getAuthenticatedUser() {
    return this.bridgeApiService.chosenAPI.getAuthenticatedUser();
  }

  authenticate(body: LoginRequestBody) {
    return this.bridgeApiService.chosenAPI.authenticate(body);
  }

  registratePetAgency(body: RegistrationRequestBody) {
    return this.bridgeApiService.chosenAPI.registratePetAgency(body);
  }

  registratePetAdopter(body: RegistrationRequestBody) {
    return this.bridgeApiService.chosenAPI.registratePetAdopter(body);
  }

  logout() {
    return this.bridgeApiService.chosenAPI.logout();
  }

  // Cookie

  setTokenCookie(token: string, email: string, id: number) {
    this.cookie.set('token', token, { path: '/' });
    this.cookie.set('email', email, { path: '/' });
    this.cookie.set('id', id.toString(), { path: '/'});
  }

  removeTokenCookie() {
    this.cookie.delete('token', '/');
    this.cookie.delete('id', '/');
  }

  checkTokenCookie() {
    return this.cookie.check('token');
  }

  // User

  set authenticatedUser(user: User|null) {
    this._authenticatedUser.next(user);
  }

  get authenticatedUser(): User|null {
    return this._authenticatedUser.getValue();
  }

  get authenticatedUserBehaviorSubject() {
    return this._authenticatedUser;
  }

  isAuthenticatedUserLoaded() {
    return this.authenticatedUser !== null;
  }

}
