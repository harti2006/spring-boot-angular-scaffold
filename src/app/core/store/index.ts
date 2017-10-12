import {user} from './user';
import {languages} from './languages';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {Language} from '../../languages/language';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';

export interface AppState {
  user: string;
  languages: Language[];
}

const reducers = {user, languages, routerReducer};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule
  ]
})
export class CoreStoreModule {
}
