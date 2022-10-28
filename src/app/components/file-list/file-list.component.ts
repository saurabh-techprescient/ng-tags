import { Component, OnInit, ViewChild } from '@angular/core';
import { messages } from '../../shared/messages';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AppService } from '../../services/app.service';
import { constants } from '../../shared/constants';
import { File } from '../../interfaces/file';
import { FilesService } from '../../services/files.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
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
  isLoading = false;
  newTags: string[] | undefined;
  showFileUploadPopup = false;
  uploadedFiles = new Array<File>();
  constructor(
    private readonly filesService: FilesService,
    private readonly tagsService: TagsService,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.tagsService.selectedTag.subscribe((res) => {
      this.selectedTag = res;
    });
    this.getDocs();
  }

  getDocs() {
    this.filesService.getDocs().subscribe({
      next: (value: Array<File> | null) => {
        if (value) {
          this.files = [];
          this.files = value;
        }
      }
    });
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
      this.isLoading = true;
      const files = new Array<string>();
      this.selectedFiles.forEach((file: File) => files.push(file.externalId));
      const docs = {
        externalIds: files,
        tags: [
          {
            tagId: this.selectedTag.tagId
          }
        ]
      };
      this.filesService.addDocsToTag(docs).subscribe({
        next: (value: any) => {
          this.filesService.updateSelectedFiles(files);
          this.files = value;
          this.selectedFiles = [];
          this.getDocs();
          this.isLoading = false;
        }
      });
    }
  }
}
