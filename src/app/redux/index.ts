import { TagsState } from './states/tags.state';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as TagsReducer from './reducers/tags.reducer';
import * as FilesReducer from './reducers/file.reducer';
import * as AppReducer from './reducers/app.reducer';
import { AppState } from './states/app.state';
import { FileState } from './states/file.state';

export interface State {
  tag: TagsState;
  files: FileState;
  app: AppState;
}
export const reducers: ActionReducerMap<State> = {
  tag: TagsReducer.reducer,
  files: FilesReducer.reducer,
  app: AppReducer.reducer
};
export const metaReducers: MetaReducer<State>[] = [];
