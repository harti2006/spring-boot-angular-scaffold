import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  username: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(username => this.username = username);
  }

  private onLogout() {
    this.userService.logout()
      .subscribe(_ => this.router.navigateByUrl('/login'));
  }

}
