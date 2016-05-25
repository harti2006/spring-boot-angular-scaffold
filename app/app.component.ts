import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {htmlTemplate} from "./app.component.html";
import {DashboardComponent} from "./dashboard.component";
import {LoginComponent} from "./login.component";
import {UserService} from "./user.service";

@Component({
    selector: 'my-app',
    template: htmlTemplate,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        UserService
    ]
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    }
])
export class AppComponent {
    title = 'My App';
}
