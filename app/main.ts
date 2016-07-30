import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {HTTP_PROVIDERS, RequestOptions} from "@angular/http";
import {AppComponent} from "./app.component";
import {appRouterProviders} from "./app.routes";
import {ReadOnlyRequestOptions} from "./read-only-request-options";

bootstrap(
    AppComponent,
    [appRouterProviders, HTTP_PROVIDERS, provide(RequestOptions, {useClass: ReadOnlyRequestOptions})]
);
