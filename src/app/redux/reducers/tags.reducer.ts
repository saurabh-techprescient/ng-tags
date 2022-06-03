import { Action, createReducer, on } from '@ngrx/store';
import { tagsInitialState, TagsState } from '../states/tags.state';
import { loadTagsSuccess, loadSelectedTag } from '../actions/tags.actions';

const metaReducer = createReducer(
  tagsInitialState,
  on(loadTagsSuccess, (state, { data }) => ({ ...state, tag: data })),
  on(loadSelectedTag, (state, { data }) => ({ ...state, selectedNode: data }))
);
export const reducer = (state: TagsState | undefined, action: Action) =>
  metaReducer(state, action);
