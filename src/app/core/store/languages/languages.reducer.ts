import * as LanguagesActions from './languages.actions';
import {Language} from "../../../languages/language";

export type Action = LanguagesActions.All;

export function languages(state: Language[] = [], action: Action): Language[] {
  switch (action.type) {
    case LanguagesActions.SET:
      return [...action.languages];

    case LanguagesActions.ADD:
      return [...state, action.language];

    case LanguagesActions.REMOVE:
      return state.filter(l => l !== action.language);

    default:
      return state;
  }
}

