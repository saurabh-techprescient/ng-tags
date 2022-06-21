import { createAction, props } from '@ngrx/store';
import { File } from '../../interfaces/file';

export const loadFiles = createAction('[File] Load Files');

export const loadFilesSuccess = createAction(
  '[File] Load Files Success',
  props<{ data: Array<File> }>()
);

export const loadFilesFailure = createAction(
  '[File] Load Files Failure',
  props<{ error: any }>()
);

export const deleteFile = createAction(
  '[File] Delete File',
  props<{ data: string }>()
);
export const deleteFileSuccess = createAction(
  '[File] Delete File Success',
  props<{ data: boolean }>()
);

export const deleteFileFailure = createAction(
  '[File] Delete File Failure',
  props<{ error: any }>()
);

export const unlinkFile = createAction(
  '[File] Unlink File',
  props<{ data: { tagId: string; files: string[] } }>()
);
export const unlinkFileSuccess = createAction(
  '[File] Unlink File Success',
  props<{ data: boolean }>()
);

export const unlinkFileFailure = createAction(
  '[File] Unlink File Failure',
  props<{ error: any }>()
);

export const updateTags = createAction(
  '[File] Update File Tags',
  props<{ data: { fileId: string; tags: string[] } }>()
);
export const updateTagsSuccess = createAction(
  '[File] DUpdate File Tags Success',
  props<{ data: boolean }>()
);

export const updateTagsFailure = createAction(
  '[File] Update File Tags Failure',
  props<{ error: any }>()
);

export const createTags = createAction(
  '[File] Create File Tags',
  props<{ data: { files: string[]; tags: string[] } }>()
);
export const createTagsSuccess = createAction(
  '[File] Create File Tags Success',
  props<{ data: boolean }>()
);

export const createTagsFailure = createAction(
  '[File] Create File Tags Failure',
  props<{ error: any }>()
);

export const uploadFiles = createAction(
  '[File] Upload Files',
  props<{ data: { tagId: string; files: string[] } }>()
);
export const uploadFilesSuccess = createAction(
  '[File] Upload Files Success',
  props<{ data: boolean }>()
);

export const uploadFilesFailure = createAction(
  '[File] Upload Files Failure',
  props<{ error: any }>()
);
