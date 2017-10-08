import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Language} from './language';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/ignoreElements';
import {Store} from "@ngrx/store";
import {AppState} from "../core/store/index";
import * as Languages from '../core/store/languages/languages.actions'

@Injectable()
export class LanguageService {

  private languagesUrl = '/api/languages';

  public languages$: Observable<Language[]>;

  constructor(private http: Http, private store: Store<AppState>) {
    this.languages$ = store.select(state => state.languages);
    this.refreshLanguages();
  }

  refreshLanguages() {
    this.http.get(this.languagesUrl)
      .map(this.extractLanguages)
      .catch(this.handleError)
      .subscribe(languages => this.store.dispatch(new Languages.Set(languages)))
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get(this.languagesUrl)
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  createLanguage(name: string): void {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(this.languagesUrl, JSON.stringify({name}), {headers})
      .catch(this.handleError)
      .map(res => res.json())
      .subscribe((language: Language) => this.store.dispatch(new Languages.Add(language)))
  }

  deleteLanguage(language: Language): void {
    this.http.delete(language._links.self.href)
      .catch(this.handleError)
      .ignoreElements()
      .subscribe({complete: () => this.store.dispatch(new Languages.Remove(language))})
  }

  private extractLanguages(res: Response): Language[] {
    return res.json()._embedded.languages;
  }

  private handleError(error: any) {
    const errMsg = error.json().message;
    return Observable.throw(errMsg);
  }
}
