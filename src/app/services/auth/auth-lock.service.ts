import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
//import { map } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

import { AUTH_CONFIG } from './auth.config';
import { AuthServiceApi } from './auth.service';

const enum LocalStorage {
  IdToken = 'id_token',
  AccessToken = 'access_token',
  ExpiresAt = 'expires_at'
}

@Injectable()
export class AuthLockService implements AuthServiceApi {
  private params: Auth0LockAuthParamsOptions = {
    scope: AUTH_CONFIG.SCOPE
  };

  private auth: Auth0LockAuthOptions = {
    responseType: 'token id_token',
    params: this.params,
    redirectUrl: AUTH_CONFIG.REDIRECT,
    redirect: false // Popup mode
  };

  /** https://github.com/auth0/lock#customization */
  private auth0LockOptions: Auth0LockConstructorOptions = {
    theme: {
      logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
      primaryColor: '#3c4349'
    },
    auth: this.auth,
    socialButtonStyle: 'small',
    allowedConnections: ['Username-Password-Authentication'],
    languageDictionary: {
      emailInputPlaceholder: 'admin@gmail.com',
      passwordInputPlaceholder: 'Adm!n1234',
      title: 'Intellect Angular + Auth0'
    },
    autofocus: true,
    allowForgotPassword: true,
    allowSignUp: false,
    autoclose: true,
    closable: true,
    avatar: {
      url: (_email, cb) => cb({} as auth0.Auth0Error, ''),
      displayName: (_email, cb) => cb({} as auth0.Auth0Error, '')
    },
    prefill: { email: 'user@email.com' }
  };

  private lock = new Auth0Lock(AUTH_CONFIG.CLIENT_ID, AUTH_CONFIG.CLIENT_DOMAIN, this.auth0LockOptions);

  private authSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$: Observable<boolean> = this.authSubject.asObservable();

  constructor() {
  }

  authenticate = () => {
    if (this.isAuthenticated()) this.authenticateFromToken();

    this.lock.on('authenticated', authResult => {
      console.log(authResult);
      this.setSession(authResult);
      this.dispatchUserFromToken(authResult.idTokenPayload);
    });

    this.lock.on('authorization_error', error => console.error(error));
  };

  login = () => this.lock.show();

  logout = () => {
    localStorage.removeItem(LocalStorage.IdToken);
    localStorage.removeItem(LocalStorage.AccessToken);
    localStorage.removeItem(LocalStorage.ExpiresAt);
    this.authSubject.next(false);
  };

  getToken = () => localStorage.getItem(LocalStorage.IdToken);

  isAuthenticated = () => new Date().getTime() < JSON.parse(localStorage.getItem(LocalStorage.ExpiresAt) || 'null');

  get authenticated() {
    return this.isAuthenticated();
  }

  private authenticateFromToken = () => {
    const token = this.getToken();
    if (!token) return;
    this.dispatchUserFromToken(jwtDecode(token));
  };

  private dispatchUserFromToken = (token: any) => {
    console.log(token);
    const { sub: id } = token;
    const { name: username, roles } = token['http://stackblitz/appMetadata'];
    console.log({ id, username, roles });
    this.authSubject.next(true);
  };

  private setSession = ({ expiresIn, idToken, accessToken }: auth0.Auth0DecodedHash) => {
    if (idToken) localStorage.setItem(LocalStorage.IdToken, idToken);
    if (accessToken) localStorage.setItem(LocalStorage.AccessToken, accessToken);
    if (expiresIn) localStorage.setItem(LocalStorage.ExpiresAt, JSON.stringify(expiresIn * 1000 + new Date().getTime()));
  };
}
