import { createFeatureSelector, createSelector } from '@ngrx/store';
import { appFeatureKey, AppState } from '../states/app.state';

export const app = createFeatureSelector<AppState>(appFeatureKey);

export const getAppApiRequests = createSelector(
  app,
  (state: AppState) => state.apiRequests
);

export const getLoadingText = createSelector(
  app,
  (state: AppState) => state.loadingText
);

export const getFileDrop = createSelector(
  app,
  (state: AppState) => state.fileDrop
);
