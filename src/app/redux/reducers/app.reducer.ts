import { Action, createReducer, on } from '@ngrx/store';
import { appInitialState, AppState } from '../states/app.state';
import {
  fileDropped,
  loadFilesApiSuccess,
  loadingText,
  loadTagsApiSuccess
} from '../actions/app.actions';

const appReducer = createReducer(
  appInitialState,
  on(loadTagsApiSuccess, (state, { data }) => {
    const requests = { ...state.apiRequests };
    requests.tags = data;
    return { ...state, apiRequests: requests };
  }),
  on(loadFilesApiSuccess, (state, { data }) => {
    const requests = { ...state.apiRequests };
    requests.fileList = data;
    return { ...state, apiRequests: requests };
  }),
  on(loadingText, (state, { data }) => ({ ...state, loadingText: data })),
  on(fileDropped, (state, { data }) => ({ ...state, fileDrop: data }))
);
export const reducer = (state: AppState | undefined, action: Action) =>
  appReducer(state, action);
