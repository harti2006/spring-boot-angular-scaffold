import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'languages'},
  {path: 'login', component: LoginComponent}
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
