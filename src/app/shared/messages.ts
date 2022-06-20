import { constants } from './constants';

export const messages = {
  loading: {
    loadingText: 'Loading...',
    fileList: 'Loading files...',
    tags: 'Loading Tags...',
    createNode: 'Creating new node...',
    deleteNode: 'Deleting selected node...',
    deleteFile: 'Deleting files...',
    unlinkFile: 'Unlinking file...',
    downloading: 'Downloading file...',
    updateTags: 'Updating file tags...',
    createTags: 'Adding new tags...',
    uploadAssociatedFiles: 'Uploading associated files...'
  },
  tagsTable: {
    title: 'Tags',
    addTag: 'Add Tag',
    editTag: 'Edit Tag',
    deleteTag: 'Delete Tag',
    clear: 'Clear',
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
    noFiles: 'No files found!',
    uploadButton: 'Upload',
    addTagsToSelectedFiles: 'Add Tags to selected Files',
    title: 'All Files',
    fileUpload: 'Upload Files',
    failedUpload: 'Failed to upload file',
    viewTags: 'View Tags'
  },
  selectedNode: {
    columns: {
      placeholders: {
        globalSearch: 'search...'
      },
      name: 'Tag Name'
    },
    unlinkFile: {
      title: 'Unlink selected files',
      header: 'Are you sure that you want to unlink?'
    },
    noFiles: 'No files found!',
    title: 'Welcome',
    description:
      '        To get begin select a tag from the left panel. Then link files\n' +
      '        in using the one of the two options:',
    pointOne: 'Drag single files from the right panel to the middle panel',
    pointTwo:
      ' Multi-select files by toggling the checkboxes, click the\n' +
      '          "Actions" dropdown, and select "Associate with tag"'
  },
  buttons: {
    create: 'Create',
    update: 'Update',
    cancel: 'Cancel',
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
    deleteFile: {
      success: 'Successfully deleted the file!',
      failed: 'Failed to delete the file!'
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
      failed: 'Failed to upload the file!',
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
