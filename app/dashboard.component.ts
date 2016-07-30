import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {htmlTemplate} from "./dashboard.component.html";
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
    selector: 'my-dashboard',
    template: htmlTemplate,
    // styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    currentUser:User;

    constructor(private _router:Router,
                private _userService:UserService) {
        this._userService.currentUser$.subscribe(this.handleUserChange.bind(this));
    }

    ngOnInit() {
        this._userService.fetchCurrentUser();
    }

    performLogout() {
        this._userService.logout();
    }

    private handleUserChange(user:User) {
        this.currentUser = user;
        this.currentUser || this._router.navigate(["/login"]);
    }
}
