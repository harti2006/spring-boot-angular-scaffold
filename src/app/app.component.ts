import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  user$: Observable<string>;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  private onLogout() {
    this.userService.logout();
    // .subscribe(_ => this.router.navigateByUrl('/login'));
  }

}
