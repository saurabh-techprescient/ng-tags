import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { messages } from '../../shared/messages';
import { Table } from 'primeng/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getAllFiles } from '../../redux/selectors/file.selectors';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { getSelectedTag } from '../../redux/selectors/tags.selectors';
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
  selectedTagSubscription = new Subscription();
  fileDropSubscription = new Subscription();
  contextItem: File | undefined;
  tags: string[] | undefined;
  showViewTags = false;
  isAssociated = false;
  tagsTitle = '';
  showAddTags = false;
  newTags: string[] | undefined;
  showFileUploadPopup = false;
  uploadedFiles = new Array<File>();
  constructor(
    private readonly store: Store,
    private readonly confirmationService: ConfirmationService,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.filesSubscription = this.store.select(getAllFiles).subscribe({
      next: (value: Array<File> | null) => {
        if (value) {
          this.files = [];
          this.files = value;
        }
      }
    });
    this.selectedTagSubscription = this.store.select(getSelectedTag).subscribe({
      next: (value) => {
        this.selectedTag = value;
        this.updateActionMenu();
      }
    });
  }

  ngOnDestroy(): void {
    this.filesSubscription.unsubscribe();
    this.selectedTagSubscription.unsubscribe();
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
    this.isAssociated =
      this.selectedTag === null || this.selectedFiles.length === 0;
  }

  associateAllWithMetadata(): void {
    if (this.selectedFiles && this.selectedTag) {
      const files = new Array<string>();
      this.selectedFiles.forEach((file: File) => files.push(file.fileId));
      this.store.dispatch(
        uploadFiles({
          data: { tagId: this.selectedTag.tagId, files }
        })
      );
    }
  }
}
