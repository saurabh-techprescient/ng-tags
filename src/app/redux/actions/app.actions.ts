import { createAction, props } from '@ngrx/store';
export const loadTagsApiSuccess = createAction(
  '[App] Load Apps Meta Tree API Success',
  props<{ data: boolean }>()
);

export const loadFilesApiSuccess = createAction(
  '[App] Load Apps Files API Success',
  props<{ data: boolean }>()
);

export const loadingText = createAction(
  '[App] Loading Text',
  props<{ data: string }>()
);

export const fileDropped = createAction(
  '[App] File Dropped',
  props<{ data: boolean }>()
);
