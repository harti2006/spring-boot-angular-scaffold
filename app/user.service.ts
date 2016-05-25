import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {User} from "./user";
import {CsrfRequestOptions} from "./csrf-request-options";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import "rxjs/add/observable/of";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/share";

@Injectable()
export class UserService {

    private _sessionUrl = '/session';
    private _logoutUrl = '/logout';

    currentUser$:Observable<User>;
    private _currentUserObserver:Observer<User>;
    private _dataStore:{
        currentUser:User,
        expiryDate:number
    };

    constructor(private _http:Http) {
        this._dataStore = {
            currentUser: null,
            expiryDate: Date.now()
        };
        this.currentUser$ = new Observable(observer => this._currentUserObserver = observer).share();
    }

    fetchCurrentUser():void {
        if (this.isExpired()) {
            this._http.get(this._sessionUrl)
                .map(UserService.extractResponse)
                .catch(UserService.handleError)
                .subscribe(this.handleUserChange.bind(this));
        } else {
            this._currentUserObserver.next(this._dataStore.currentUser);
        }
    }

    private isExpired():boolean {
        return Date.now() > this._dataStore.expiryDate;
    }

    login(username:string, password:string):void {
        Observable.of(null)
            .map(() => {
                let requestOptions = new CsrfRequestOptions();
                requestOptions.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
                return requestOptions;
            })
            .concatMap(request => this._http.post(this._sessionUrl, null, request))
            .retry(1) // first attempt might fail, due to invalid / expired csrf token
            .map(UserService.extractResponse)
            .subscribe(this.handleUserChange.bind(this));
    }

    logout():void {
        this._http.post(this._logoutUrl, null, new CsrfRequestOptions())
            .map(response => null)
            .subscribe(this.handleUserChange.bind(this));
    }

    private handleUserChange(user:User):void {
        this._dataStore.currentUser = user;
        this._dataStore.expiryDate = Date.now() + 300000;
        this._currentUserObserver.next(this._dataStore.currentUser);
    }

    static extractResponse(res:Response) {
        let user = new User();
        user.name = res.json().name;
        return user;
    }

    static handleError(error:any):Observable<any> {
        if (error.status == 401
        ) {
            return Observable.of(null);
        }
        else {
            let errMsg = JSON.stringify(error);
            console.error(errMsg);
            return Observable.throw(errMsg);
        }
    }
}
