export const htmlTemplate = `
<div class="page-header">
  <h1>Please sign in</h1>
</div>
<form class="login-form" role="form" (submit)="performLogin()">
  <div class="form-group col-sm-offset-3 col-sm-6">
    <label for="usernameInput" class="sr-only">Username</label>
    <input id="usernameInput" class="form-control input-lg" [(ngModel)]="username" placeholder="Username" required autofocus />
  </div>
  <div class="form-group col-sm-offset-3 col-sm-6">
    <label for="passwordInput" class="sr-only">Password</label>
    <input id="passwordInput" class="form-control input-lg" [(ngModel)]="password" type="Password" placeholder="password" required />
  </div>
  <div class="form-group col-sm-offset-3 col-sm-6">
    <button role="submit" class="btn btn-primary btn-lg">Go!</button>
  </div>
</form>
`;
