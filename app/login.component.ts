import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {htmlTemplate} from "./login.component.html";
import {UserService} from "./user.service";

@Component({
    selector: 'my-login',
    template: htmlTemplate,
    styles: [`
      .login-form button[role=submit] {
        width: 100%;
      }
    `]
})
export class LoginComponent implements OnInit {

    username:string = '';
    password:string = '';

    constructor(private _router:Router,
                private _userService:UserService) {
        this._userService.currentUser$.subscribe((user) => user === null || this._router.navigate(['Dashboard']))
    }

    ngOnInit() {
        this._userService.fetchCurrentUser();
    }

    performLogin() {
        this._userService.login(this.username, this.password);
    }
}
