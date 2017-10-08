import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Store} from "@ngrx/store";
import {AppState} from "./core/store";
import * as User from './core/store/user/user.actions';

@Injectable()
export class UserService {

  private sessionUrl = '/session';
  private loginUrl = '/login';
  private logoutUrl = '/logout';

  public user$: Observable<string>;


  constructor(private http: Http, private store: Store<AppState>) {
    this.user$ = store.select(state => state.user);

    this.http.get(this.sessionUrl)
      .map(this.extractUsername)
      .subscribe(
        username => this.storeUser(username),
        err => this.handleError(err));
  }

  login(username: string, password: string): void {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'username=' + username + '&password=' + password;
    this.http.post(this.loginUrl, body, {headers})
      .map(this.extractUsername)
      .subscribe(
        username => this.storeUser(username),
        err => this.handleError(err))
  }

  logout(): void {
    this.http.post(this.logoutUrl, null)
      .subscribe(
        _ => this.removeUser(),
        err => this.handleError(err));
  }

  private storeUser(userName: string): void {
    this.store.dispatch(new User.Login(userName));
  }

  private removeUser(): void {
    this.store.dispatch(new User.Logout());
  }

  private handleError(error: Response): void {
    if ([401, 403].indexOf(error.status) === -1) {
      console.log(error);
    }

    this.removeUser();
  }


  private extractUsername(res: Response): string {
    return res.json().username;
  }

}
