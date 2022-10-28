import { constants } from './constants';

export const messages = {
  loadingText: 'Please Wait...',
  tagsTable: {
    title: 'Tags',
    addTag: 'Add Tag',
    editTag: 'Edit Tag',
    deleteTag: 'Delete Tag',
    deleteTagMsg: 'Are you sure you want to delete tag',
    clear: 'Clear',
    noTags: 'No files found!',
    form: {
      name: 'Tag Name',
      formErrors: {
        required: 'Required',
        metadataName: {
          minLength: `Length should be more than ${constants.tagNameMinLength} characters`
        }
      }
    },
    deleteMetadata: {
      header: 'Are you sure that you want to delete?'
    }
  },
  filesTable: {
    columns: {
      placeholders: {
        globalSearch: 'search...'
      },
      actions: {
        associatedMessage: 'Associate with selected Tag',
        addTags: 'Add Tags',
        editTags: 'Edit Tags',
        download: 'Download File',
        delete: 'Delete File'
      },
      name: 'Name'
    },
    removeFile: 'Remove File',
    removeFileMsg: 'Are you sure you want to remove the file from tag',
    noFiles: 'No files found!',
    uploadButton: 'Upload',
    addTagsToSelectedFiles: 'Add Tags to selected Files',
    title: 'All Files',
    fileUpload: 'Upload Files',
    failedUpload: 'Failed to upload file',
    viewTags: 'View Tags'
  },
  selectedTag: {
    columns: {
      placeholders: {
        globalSearch: 'search...'
      },
      name: 'Name'
    },
    unlinkFile: {
      title: 'Unlink selected files',
      header: 'Are you sure that you want to unlink?',
      unlink: 'Unlink'
    },
    noFiles: 'No files found!',
    title: 'Welcome',
    description:
      'To get begin select a tag from the left panel. select files from the right panel' +
      ' and click the "Link To Tag" at the top right corner of the right panel.'
  },
  buttons: {
    create: 'Create',
    update: 'Update',
    cancel: 'Cancel',
    delete: 'Delete',
    action: 'Actions'
  },
  success: 'Success!',
  failure: 'Failure!',
  info: 'Info!',
  apiRequests: {
    files: {
      success: 'Successfully fetched files!',
      failed: 'Failed to fetch files!'
    },
    deleteTag: {
      success: 'Successfully deleted the tag!',
      failed: 'Failed to delete the tag!'
    },
    unlinkFile: {
      failed: 'Failed to unlink the file!',
      success: 'Successfully unlinked the file!'
    },
    downloadFile: {
      failed: 'Failed to download the file!',
      success: 'Successfully downloaded the file!'
    },
    createFileTag: {
      failed: 'Failed to create the file tag!',
      success: 'Successfully created the file tag!'
    },
    updateFileTag: {
      failed: 'Failed to update the file tags!',
      success: 'Successfully updated the file tags!'
    },
    uploadFile: {
      failed: 'Failed to upload the tag!',
      success: 'File uploaded successfully!'
    },
    fetchAllMetaNode: {
      failed: 'Failed to fetch metadata tag!',
      success: 'Successfully fetched metadata tag!'
    },
    createNode: {
      failed: 'Failed to create tag!',
      success: 'Successfully created the tag!'
    },
    deleteNode: {
      failed: 'Failed to delete tag!',
      success: 'Successfully deleted the tag!'
    }
  },
  title: 'Tags Management'
};
