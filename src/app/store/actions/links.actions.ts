import { Action } from '@ngrx/store';
import { Link, LinkAddStatus } from './../models/link.model';

export const LOAD_LINKS = '[Links] Load Links';
export const SET_ADD_LINK_STATUS = '[Links] Set Add Link Status';

export class LoadLinks implements Action {
  readonly type = LOAD_LINKS;
  constructor(public payload: Link[]) {}
}

export class SetAddLinkStatus implements Action {
  readonly type = SET_ADD_LINK_STATUS;
  constructor(public payload: LinkAddStatus) {}
}

export type LinksActions = LoadLinks | SetAddLinkStatus;
