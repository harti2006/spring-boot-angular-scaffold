import {Action} from '@ngrx/store';
import {Language} from '../../../languages/language';

export const SET = '[Languages] SET';
export const ADD = '[Languages] ADD';
export const REMOVE = '[Languages] REMOVE';

export class Set implements Action {
  readonly type = SET;

  constructor(public languages: Language[]) {
  }
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public language: Language) {
  }
}

export class Remove implements Action {
  readonly type = REMOVE;

  constructor(public language: Language) {
  }
}

export type All = Add | Set | Remove;
