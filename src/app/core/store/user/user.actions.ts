import {Action} from "@ngrx/store";

export const LOGIN = '[User] LOGIN';
export const LOGOUT = '[User] LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public userName: string) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type All = Login | Logout;
