import { environment } from '../../environments/environment';

export const constants = {
  tableScrollHeight: '500px',
  treeScrollHeight: '464px',
  dateFormat: 'MMM dd, YYYY',
  windowData: (window as { [key: string]: any })[environment.settingsProperty],
  defaultUrl: 'http://localhost/itron',
  tagNameMinLength: 2
};
