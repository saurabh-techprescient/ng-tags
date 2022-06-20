import { File } from '../../interfaces/file';

export const fileFeatureKey = 'files';

export interface FileState {
  files: Array<File> | null;
}

export const fileInitialState: FileState = {
  files: null
};
