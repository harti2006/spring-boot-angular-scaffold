import * as UserActions from './user.actions';

export type Action = UserActions.All;

const ANONYMOUS = '';

export function user(state: string = ANONYMOUS, action: Action): string {
  switch (action.type) {
    case UserActions.LOGIN:
      return action.userName;

    case UserActions.LOGOUT:
      return ANONYMOUS;

    default:
      return state;
  }
}

