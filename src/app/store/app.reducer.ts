import { ActionReducerMap } from '@ngrx/store';
import * as fromLinks from './reducers/links.reducer';

export interface State {
  links: fromLinks.LinksState;
}

export const reducers: ActionReducerMap<State> = {
  links: fromLinks.linksReducer
};
