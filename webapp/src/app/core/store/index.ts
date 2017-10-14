import {user} from './user';
import {languages} from './languages';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {Language} from '../../languages/language';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';

export interface AppState {
  user: string;
  languages: Language[];
}

const reducers = {user, languages, routerReducer};
const optionalImports = [];
if (!environment.production) {
  optionalImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    ...optionalImports
  ]
})
export class CoreStoreModule {
}
