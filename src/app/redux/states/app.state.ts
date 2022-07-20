import { messages } from '../../shared/messages';

export const appFeatureKey = 'app';

export interface AppState {
  apiRequests: {
    tags: boolean;
    fileList: boolean;
  };
  loadingText: string;
  fileDrop: boolean;
}

export const appInitialState: AppState = {
  apiRequests: {
    tags: false,
    fileList: false
  },
  loadingText: messages.loading.loadingText,
  fileDrop: false
};
