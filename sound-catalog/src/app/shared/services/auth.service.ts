import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { AuthData } from '../models/authData';
import { ErrorAuth } from '../models/errorAuth';
import { ErrorAuthType } from '../models/errorAuthType';

@Injectable()

export class AuthService {
  private token: string | null;
  private jwtHelper: JwtHelper;

  constructor(
    private httpClient: HttpClient
  ) {
      this.jwtHelper = new JwtHelper();
    }

  register(user: User) :Promise<boolean>{
    return this.httpClient.post(environment.soundCatalogApiURL + '/account/register', user)
      .toPromise()
      .then(res => { return true; } )
      .catch(this.handleError);
  }

  checkEmailNotTaken(email: string): Promise<boolean> {
    let params = new HttpParams().set('email', email);
    return this.httpClient.get<boolean>(environment.soundCatalogApiURL + '/account/isValidNewMail', { params: params })
      .toPromise()
      .then(res => {
        return res
      })
      .catch(this.handleError);
  }

  login(email: string, password: string): Promise<AuthData> {
    return this.httpClient.post<AuthData>(environment.soundCatalogApiURL + '/account/login', { email: email, password: password })
      .toPromise()
      .then(this.returnAndStoreToken)
      .catch(this.handleLoginError);
  } 

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    // Check whether the token is expired and return
    // true or false
    return (token && !this.jwtHelper.isTokenExpired(token));
  }

  getToken(): string {
    let authData: AuthData;
    if (localStorage.getItem('token') != null) {
      authData = JSON.parse(localStorage.getItem('token'));
      return authData.token;
    }
    return null;
  }

  generateConfirmEmail(email: string) {
    let params = new HttpParams().set('email', email);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/generateconfirmemail', { params: params })
      .toPromise()
      .then(res => { return true;})
  }

  verifyEmail(userId: string, code: string): Promise<boolean> {
    // Setup log namespace query parameter
    let params = new HttpParams()
      .set('userId', userId)
      .set('code', code);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/confirmemail', { params: params })
      .toPromise()
      .then(res => { return true; })
      .catch(res => { return Promise.reject('Link is invalid. Try again.'); })
  }

  sendEmailPwdRecovery(email: string) {
    let params = new HttpParams().set('email', email);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/generatepwdrecoveryemail', { params: params })
      .toPromise()
      .then(res => { return true; })
  }

  resetPassword(userId: string, code: string, password: string): Promise<boolean> {
    // Setup log namespace query parameter
    let params = new HttpParams()
      .set('userId', userId)
      .set('code', code)
      .set('password', password);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/resetpassword', { params: params })
      .toPromise()
      .then(res => { return true; })
      .catch(this.handleError);
  }

  testMethodAuthorized(): Promise<boolean> {
    return this.httpClient.get(environment.soundCatalogApiURL + '/account/test')
      .toPromise()
      .then(res => {
        return true;
      })
      .catch(this.handleError)
  }

  private returnAndStoreToken(authData: AuthData): AuthData {
    if (authData) {
      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', JSON.stringify(authData));
      return authData;
    }
    else {
      return null;
    }
  }

  private handleLoginError(error: HttpErrorResponse): Promise<any> {
    console.log('api status:' + error.status);
    console.log('api message:' + error.error);

    let retValue = new ErrorAuth();
    retValue.Status = error.status;

    switch (error.status) {
      case 401:
        retValue.Type = ErrorAuthType.UserPwdInvalid;
        retValue.Message = 'User or password incorrect.';
        break;
      case 400:
        retValue.Type = ErrorAuthType.EmailNotConfirm;
        retValue.Message = 'Email should be confirmed';
        break;
      default:
        retValue.Type = ErrorAuthType.UnhandledException
        retValue.Message = 'Unhandled exception';
    }

    return Promise.reject(retValue);
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    console.log('api status:' + error.status);
    console.log('api message:' + error.error);

    if (error.status >= 500) {
      return Promise.reject('Unhandled exception');
    }
    else {
      return Promise.reject(error.error);
    }
  }

}
