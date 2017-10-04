import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LanguagesComponent} from './languages.component';
import {languagesRouting} from './languages.routing';
import {LanguageService} from './language.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    languagesRouting
  ],
  declarations: [LanguagesComponent],
  providers: [
    LanguageService
  ]

})
export class LanguagesModule {
}
