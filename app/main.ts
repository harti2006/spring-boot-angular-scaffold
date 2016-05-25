import {bootstrap} from "@angular/platform-browser-dynamic";
import {provide} from "@angular/core";
import {HTTP_PROVIDERS, RequestOptions} from "@angular/http";
import {AppComponent} from "./app.component";
import {ReadOnlyRequestOptions} from "./read-only-request-options";

bootstrap(
    AppComponent, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: ReadOnlyRequestOptions})]
);
