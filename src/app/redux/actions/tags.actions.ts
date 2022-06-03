import { createAction, props } from '@ngrx/store';
import { Tags } from '../../interfaces/tags';
import { TreeNode } from 'primeng/api';
import { Tag } from '../../interfaces/tag';

export const loadTags = createAction('[Tags] Load Tags');

export const loadTagsSuccess = createAction(
  '[Tags] Load Tags Success',
  props<{ data: Array<Tags> }>()
);

export const loadTagsFailure = createAction(
  '[Tags] Load Tags Failure',
  props<{ error: any }>()
);

export const loadSelectedTag = createAction(
  '[Tags] Load Tags Selected Node',
  props<{ data: TreeNode | null }>()
);

export const createTag = createAction(
  '[Tags] Create Tag',
  props<{ data: Tag }>()
);
export const createTagSuccess = createAction(
  '[Tags] Create Tag Success',
  props<{ data: boolean }>()
);

export const createTagFailure = createAction(
  '[Tags] Create Tag Failure',
  props<{ error: any }>()
);

export const updateTag = createAction(
  '[Tags] Update Tag',
  props<{ data: Tag }>()
);
export const updateTagSuccess = createAction(
  '[Tags] Update Tag Success',
  props<{ data: boolean }>()
);

export const updateTagFailure = createAction(
  '[Tags] Update Tag Failure',
  props<{ error: any }>()
);

export const deleteTag = createAction(
  '[Tags] Delete Tag',
  props<{ data: string }>()
);
export const deleteTagSuccess = createAction(
  '[Tags] Delete Tag Success',
  props<{ data: boolean }>()
);

export const deleteTagFailure = createAction(
  '[Tags] Delete Tag Failure',
  props<{ error: any }>()
);
