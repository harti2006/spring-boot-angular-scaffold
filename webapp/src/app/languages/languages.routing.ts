import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LanguagesComponent} from './languages.component';

const languagesRoutes: Routes = [
  {path: 'languages', component: LanguagesComponent}
];
export const languagesRouting: ModuleWithProviders = RouterModule.forChild(languagesRoutes);
