import {Component, OnInit} from '@angular/core';
import {LanguageService} from './language.service';
import {Language} from './language';
import {UserService} from '../user.service';
import {Observable} from "rxjs/Observable";

@Component({
  templateUrl: './languages.component.html'
})
export class LanguagesComponent implements OnInit {
  languages: Language[] = [];
  message: string;
  isLoggedIn$: Observable<boolean>;

  constructor(private service: LanguageService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.service.getLanguages()
      .subscribe(languages => this.languages = languages);

    this.isLoggedIn$ = this.userService.user$.map(user => !!user);
  }

  addLanguage(name: string): void {
    this.service.createLanguage(name)
      .subscribe(
        (language: Language) => this.languages.push(language),
        (message: string) => this.message = message
      );
  }

  removeLanguage(language: Language): void {
    this.service.deleteLanguage(language)
      .subscribe({
        error: (message: string) => this.message = message,
        complete: () => this.languages = this.languages.filter(x => x !== language)
      });
  }

  dismissMessage(): void {
    this.message = null;
  }

}
