import { File } from '../../interfaces/file';

export const fileFeatureKey = 'files';

export interface FileState {
  fileList: Array<File> | null;
}

export const fileInitialState: FileState = {
  fileList: null
};
