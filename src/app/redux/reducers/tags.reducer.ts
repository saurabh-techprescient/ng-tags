import { Action, createReducer, on } from '@ngrx/store';
import { tagsInitialState, TagsState } from '../states/tags.state';
import { loadTagsSuccess, loadSelectedTag } from '../actions/tags.actions';

const metaReducer = createReducer(
  tagsInitialState,
  on(loadTagsSuccess, (state, { tags }) => ({ ...state, tags })),
  on(loadSelectedTag, (state, { tags }) => ({ ...state, selectedTag: tags }))
);
export const reducer = (state: TagsState | undefined, action: Action) =>
  metaReducer(state, action);
