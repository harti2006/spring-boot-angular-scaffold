import {Component, OnInit} from '@angular/core';
import {LanguageService} from './language.service';
import {Language} from './language';
import {UserService} from '../user.service';
import {Observable} from "rxjs/Observable";


@Component({
  templateUrl: './languages.component.html'
})
export class LanguagesComponent implements OnInit {
  languages$: Observable<Language[]>;
  message: string;
  isLoggedIn$: Observable<boolean>;

  constructor(private service: LanguageService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.languages$ = this.service.languages$;
    this.isLoggedIn$ = this.userService.user$.map(user => !!user);
  }

  addLanguage(name: string): void {
    this.service.createLanguage(name);
  }

  removeLanguage(language: Language): void {
    this.service.deleteLanguage(language);
  }

  dismissMessage(): void {
    this.message = null;
  }

}
