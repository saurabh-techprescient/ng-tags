import { Action, createReducer, on } from '@ngrx/store';
import { fileInitialState, FileState } from '../states/file.state';
import { loadFilesSuccess } from '../actions/file.actions';

const filesReducer = createReducer(
  fileInitialState,
  on(loadFilesSuccess, (state, { data }) => ({ ...state, file: data }))
);
export const reducer = (state: FileState | undefined, action: Action) =>
  filesReducer(state, action);
