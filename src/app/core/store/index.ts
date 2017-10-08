import {user} from './user'
import {NgModule} from "@angular/core";
import {ActionReducerMap, StoreModule} from "@ngrx/store";

export interface AppState {
  user: string;
}

const reducers: ActionReducerMap<AppState> = {user};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers)
  ]
})
export class CoreStoreModule {
}
