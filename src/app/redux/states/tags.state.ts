import { Tags } from '../../interfaces/tags';
import { TreeNode } from 'primeng/api';

export const tagsFeatureKey = 'tags';

export interface TagsState {
  tags: Array<Tags> | null;
  selectedTag: TreeNode | null;
}

export const tagsInitialState: TagsState = {
  tags: null,
  selectedTag: null
};
