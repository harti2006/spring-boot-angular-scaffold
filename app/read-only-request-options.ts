import {BaseRequestOptions} from "@angular/http";

export class ReadOnlyRequestOptions extends BaseRequestOptions {

    constructor() {
        super();
        this.headers.append('Accept', "application/json");
        this.headers.append('X-Requested-With', "XMLHttpRequest");
    }
}
