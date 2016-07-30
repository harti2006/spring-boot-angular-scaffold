import {ReadOnlyRequestOptions} from './read-only-request-options';

export class CsrfRequestOptions extends ReadOnlyRequestOptions {

    constructor() {
        super();
        this.headers.append('X-CSRF-TOKEN', CsrfRequestOptions.getCookie('CSRF-TOKEN'));
    }

    static getCookie(name):string {
        return document.cookie
                .split(';')
                .map(cookie => cookie.split('=', 2))
                .filter(cookieParts => cookieParts.length === 2 && cookieParts[0] === name)
                .map(cookieParts => cookieParts[1])
                .pop() || "";
    }
}
