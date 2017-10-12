import {Component} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private userService: UserService) {
  }

  onSubmit(): void {
    this.userService.login(this.username, this.password);
  }
}
