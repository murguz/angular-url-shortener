import { Link, LinkAddStatus } from './../models/link.model';
import { LinksActions, LOAD_LINKS, SET_ADD_LINK_STATUS } from './../actions/links.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface LinksState {
  links: Link[];
  linkAddStatus: LinkAddStatus;
}

const initialState: LinksState = {
  links: [],
  linkAddStatus: 'LINK_ADD_STATUS_START'
};

export function linksReducer(state = initialState, action: LinksActions) {
  switch (action.type) {
    case LOAD_LINKS:
      return {
        ...state,
        links: action.payload
      };
    case SET_ADD_LINK_STATUS:
      return {
        ...state,
        linkAddStatus: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getLinksState = createFeatureSelector<LinksState>('links');
export const getLinks = createSelector(getLinksState, (state: LinksState) => state.links);
export const getLinkAddStatus = createSelector(getLinksState, (state: LinksState) => state.linkAddStatus);
