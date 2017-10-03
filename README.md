# Spring Boot + Angular2 scaffold

This project shows how to build and run an Angular single-page web frontend together with a Spring Boot
backend.

## Build & Run it

...using:

    mvn clean package
      
    java --add-modules java.xml.bind -jar target/spring-boot-angular2-scaffold.jar
    
Open http://localhost:8080 in your browser.

## Development

Run the Dev-Server:

    npm start
    
Run the backend on port 8080. Either using IDE or mvn spring-boot:run

Open http://localhost:4200/app in your browser.

## Structure

The backend service has several entry points:

### /session

This endpoint returns information about the currently signed-in user,
who is recognized by the JSESSIONID cookie. In this scaffold I am using an HTTP POST request with basic auth
to this endpoint after the user submitted the login form.

### /logout

This is the common Spring Boot / Security endpoint to destroy the current session. 

### /api/**

The root path of the backend api (not yet used). One can easily use Zuul proxy to forward requests to multiple
other microservices.

### /app/**

This is managed by the Angular app. All non-asset requests will be forwarded to index.html.

## CSRF support

The CSRF support is completely working in this scaffold: In Spring security the CSRF token is bound to the
user's session. There was some extra config / coding necessary to send the current csrf token as a cookie
to the the user, every time the session / login changes. The cookie can be read from the JavaScript frontend
(and only from the code that came from the same domain). On every server request that changes the state
(POST, PUT, PATCH, DELETE), the frontend needs to include the csrf token, e.g. in the http header.

## License

Copyright 2016 André Hartmann

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
