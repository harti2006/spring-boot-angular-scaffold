import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Language} from "./language";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/ignoreElements";

@Injectable()
export class LanguageService {

  private languagesUrl = '/api/languages';

  constructor(private http: Http) {
  }

  getLanguages(): Observable<Language[]> {
    return this.http.get(this.languagesUrl)
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  createLanguage(name: string): Observable<Language> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.languagesUrl, JSON.stringify({name}), {headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteLanguage(language: Language): Observable<Language> {
    return this.http.delete(language._links.self.href)
      .ignoreElements()
      .catch(this.handleError);
  }

  private extractLanguages(res: Response): Language[] {
    return res.json()._embedded.languages;
  }

  private handleError(error: any) {
    let errMsg = error.json().message;
    return Observable.throw(errMsg);
  }
}
