export const htmlTemplate = `
<div class="page-header">
  <h1 *ngIf="currentUser">{{currentUser.name}}'s Dashboard</h1>
  <h1 *ngIf="!currentUser">Dashboard</h1>
  <button class="btn btn-default" (click)="performLogout()">Logout</button>
</div>
`;
