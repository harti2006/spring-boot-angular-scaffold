import {user} from './user'
import {languages} from './languages'
import {NgModule} from "@angular/core";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {Language} from "../../languages/language";

export interface AppState {
  user: string;
  languages: Language[];
}

const reducers: ActionReducerMap<AppState> = {user, languages};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers)
  ]
})
export class CoreStoreModule {
}
