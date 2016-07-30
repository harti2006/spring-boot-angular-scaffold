import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {htmlTemplate} from "./app.component.html";
import {UserService} from "./user.service";

@Component({
    selector: 'my-app',
    template: htmlTemplate,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        UserService
    ]
})
export class AppComponent {
    title = 'My App';
}
