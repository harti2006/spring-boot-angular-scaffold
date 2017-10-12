import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/do';

@Injectable()
export class DebugEffects {

  constructor(private actions$: Actions) {
  }

  @Effect({dispatch: false})
  logActions$ = this.actions$.do(action => console.log(action));

}
