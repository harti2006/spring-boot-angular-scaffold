import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  user$: Observable<string>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  private onLogout() {
    this.userService.logout();
  }

}
