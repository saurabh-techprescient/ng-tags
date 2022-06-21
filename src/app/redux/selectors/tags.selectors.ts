import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tagsFeatureKey, TagsState } from '../states/tags.state';

export const tags = createFeatureSelector<TagsState>(tagsFeatureKey);
export const getAllTags = createSelector(
  tags,
  (state: TagsState) => state.tags
);

export const getSelectedTag = createSelector(
  tags,
  (state: TagsState) => state.selectedTag
);
