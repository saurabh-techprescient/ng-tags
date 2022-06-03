import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { messages } from '../../shared/messages';
import { Table } from 'primeng/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAllFiles } from '../../redux/selectors/file.selectors';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { getSelectedNode } from '../../redux/selectors/tags.selectors';
import { uploadFiles } from '../../redux/actions/file.actions';
import { AppService } from '../../services/app.service';
import { constants } from '../../shared/constants';
import { File } from '../../interfaces/file';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;
  readonly messages = messages;
  readonly constants = constants;
  files = new Array<File>();
  selectedFiles = new Array<File>();
  mainActionMenu = new Array<MenuItem>();
  columnActionMenu = new Array<MenuItem>();
  selectedTag: any | null = null;
  filesSubscription = new Subscription();
  selectedNodeSubscription = new Subscription();
  fileDropSubscription = new Subscription();
  contextItem: File | undefined;
  tags: string[] | undefined;
  showViewTags = false;
  tagsTitle = '';
  showAddTags = false;
  newTags: string[] | undefined;
  draggedFile: File | undefined;
  showFileUploadPopup = false;
  uploadedFiles = new Array<File>();
  constructor(
    private readonly store: Store,
    private readonly confirmationService: ConfirmationService,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.mainActionMenu = [
      {
        label: this.messages.buttons.action,
        items: [
          {
            label: this.messages.filesTable.columns.actions.associatedMessage,
            icon: 'pi pi-list',
            command: () => this.associateAllWithMetadata()
          }
        ]
      }
    ];
    this.filesSubscription = this.store.select(getAllFiles).subscribe({
      next: (value: Array<File> | null) => {
        console.log('Value- ', value);
        if (value) {
          this.files = [];
          this.files = value;
        }
      }
    });
    this.selectedNodeSubscription = this.store
      .select(getSelectedNode)
      .subscribe({
        next: (value) => {
          this.selectedTag = value;
          this.updateActionMenu();
        }
      });
  }

  ngOnDestroy(): void {
    this.filesSubscription.unsubscribe();
    this.selectedNodeSubscription.unsubscribe();
    this.fileDropSubscription.unsubscribe();
  }

  globalFilter($event: Event): void {
    if (this.dt) {
      this.dt.filterGlobal(
        ($event.target as HTMLInputElement).value,
        'contains'
      );
    }
  }

  updateActionMenu(): void {
    this.mainActionMenu.forEach((action) => {
      const associated = action.items?.find(
        (button) =>
          button.label ===
          this.messages.filesTable.columns.actions.associatedMessage
      );
      if (associated) {
        associated.disabled =
          this.selectedTag === null || this.selectedFiles.length === 0;
      }
    });
  }

  dragStart(file: File): void {
    this.draggedFile = file;
  }

  private associateAllWithMetadata(): void {
    if (this.selectedFiles && this.selectedTag) {
      const files = new Array<string>();
      this.selectedFiles.forEach((file: File) => files.push(file.fileId));
      this.store.dispatch(
        uploadFiles({
          data: { metadataId: this.selectedTag.data.nodeId, files }
        })
      );
    }
  }
}
