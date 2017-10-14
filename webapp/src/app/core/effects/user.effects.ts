import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {LOGIN} from '../store/user/user.actions';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private router: Router) {
  }

  @Effect({dispatch: false})
  loginActions$ =
    this.actions$.ofType(LOGIN)
      .do(() => this.router.navigateByUrl(''));

}
