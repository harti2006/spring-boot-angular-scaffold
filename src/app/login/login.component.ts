import {Component} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit(): void {
    this.userService.login(this.username, this.password)
      .subscribe(_ => this.router.navigateByUrl(''));
  }
}
