import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  private sessionUrl = '/session';
  private loginUrl = '/login';
  private logoutUrl = '/logout';

  private currentUser: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: Http) {
  }

  getCurrentUser(): Observable<string> {
    this.http.get(this.sessionUrl)
      .map(this.extractUsername)
      .catch(this.handleError)
      .subscribe(username => this.currentUser.next(username));

    return this.currentUser;
  }

  login(username: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const body = 'username=' + username + '&password=' + password;
    return this.http.post(this.loginUrl, body, {headers})
      .map(this.extractUsername)
      .map(this.fanOutUsername.bind(this))
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(this.logoutUrl, null)
      .map(_ => '')
      .map(this.fanOutUsername.bind(this))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return [401, 403].indexOf(error.status) ? Observable.of('') : Observable.throw(error);
  }


  private extractUsername(res: Response): string {
    return res.json().username;
  }

  private fanOutUsername(username: string): string {
    this.currentUser.next(username);
    return username;
  }

}
