import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

// Redux
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../state/store';
import { ADD_USER, REMOVE_USER } from '../../state/actions';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { ResetPassword } from '../models/resetPassword';
import { AuthorizedUser } from '../models/authorizedUser';
import { ErrorAuth } from '../models/errorAuth';
import { ErrorAuthType } from '../models/errorAuthType';

@Injectable()

export class AuthService {
  private token: string | null;
  private jwtHelper: JwtHelper;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private httpClient: HttpClient
  ) {
      this.jwtHelper = new JwtHelper();
    }

  register(user: User): Promise<boolean> {
    return this.httpClient.post(environment.soundCatalogApiURL + '/account/register', user)
      .toPromise()
      .then(res => true )
      .catch(this.handleError);
  }

  checkEmailNotTaken(email: string): Promise<boolean> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<boolean>(environment.soundCatalogApiURL + '/account/isValidNewMail', { params: params })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(this.handleError);
  }

  login(email: string, password: string): Promise<AuthorizedUser> {
    return this.httpClient.post<AuthorizedUser>(environment.soundCatalogApiURL + '/account/login', { email: email, password: password })
      .toPromise()
      .then(this.returnAndStoreToken.bind(this))
      .catch(this.handleLoginError);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    // localStorage.removeItem('token');
    this.ngRedux.dispatch({ type: REMOVE_USER });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    // Check whether the token is expired and return
    // true or false
    return (token && !this.jwtHelper.isTokenExpired(token));
  }

  getToken(): string {
    const authUser = this.ngRedux.getState().user;
    if (authUser !== null) {
      return authUser.token;
    }
    return null;
  }

  generateConfirmEmail(email: string) {
    const params = new HttpParams().set('email', email);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/generateconfirmemail', { params: params })
      .toPromise()
      .then(res => true);
  }

  verifyEmail(userId: string, code: string): Promise<boolean> {
    // Setup log namespace query parameter
    const params = new HttpParams()
      .set('userId', userId)
      .set('code', code);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/confirmemail', { params: params })
      .toPromise()
      .then(res => true)
      .catch(res => Promise.reject('Link is invalid. Try again.'));
  }

  sendEmailPwdRecovery(email: string) {
    const params = new HttpParams().set('email', email);

    return this.httpClient.get(environment.soundCatalogApiURL + '/account/generatepwdrecoveryemail', { params: params })
      .toPromise()
      .then(res => true);
  }

  resetPassword(userId: string, code: string, password: string): Promise<boolean> {
    const model = new ResetPassword();
    model.code = code;
    model.userId = userId;
    model.password = password;

    return this.httpClient.post(environment.soundCatalogApiURL + '/account/resetpassword', model)
      .toPromise()
      .then(res => true)
      .catch(this.handleError);
  }

  testMethodAuthorized(): Promise<boolean> {
    return this.httpClient.get(environment.soundCatalogApiURL + '/account/test')
      .toPromise()
      .then(res => {
        return true;
      })
      .catch(this.handleError);
  }

  private returnAndStoreToken(authUser: AuthorizedUser): AuthorizedUser {
    if (authUser) {
      // store username and jwt token in local storage to keep user logged in between page refreshes
      this.ngRedux.dispatch({ type: ADD_USER, user: authUser});
      return authUser;
    } else {
      return null;
    }
  }

  private handleLoginError(error: HttpErrorResponse): Promise<any> {
    console.log('api status:' + error.status);
    console.log('api message:' + error.error);

    const retValue = new ErrorAuth();
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
        retValue.Type = ErrorAuthType.UnhandledException;
        retValue.Message = 'Unhandled exception';
    }

    return Promise.reject(retValue);
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    console.log('api status:' + error.status);
    console.log('api message:' + error.error);

    if (error.status >= 500) {
      return Promise.reject('Unhandled exception');
    } else {
      return Promise.reject(error.error);
    }
  }

}
