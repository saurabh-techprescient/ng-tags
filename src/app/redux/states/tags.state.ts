import { Tags } from '../../interfaces/tags';
export const tagsFeatureKey = 'tags';
export interface TagsState {
  tags: Array<Tags> | null;
  selectedTag: Tags | null;
}
export const tagsInitialState: TagsState = {
  tags: null,
  selectedTag: null
};
