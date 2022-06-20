import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fileFeatureKey, FileState } from '../states/file.state';

export const files = createFeatureSelector<FileState>(fileFeatureKey);

export const getAllFiles = createSelector(
  files,
  (state: FileState) => state.files
);
