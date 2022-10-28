import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Tags } from '../../interfaces/tags';
import { File } from '../../interfaces/file';
import { FilesService } from '../../services/files.service';
import { messages } from '../../shared/messages';
import { Table } from 'primeng/table';
import { constants } from '../../shared/constants';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  readonly messages = messages;
  readonly constants = constants;
  selectedTag: Tags | null = null;
  selectedTagSubscription = new Subscription();
  dropped = new Array<any>();
  files = new Array<File>();
  selectedFiles = new Array<File>();
  selectedTagId = '';
  selectedTagName = '';
  isLoading = false;
  showDeletePopup = false;
  file?: File;
  constructor(
    private readonly filesService: FilesService,
    private readonly tagsService: TagsService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.tagsService.selectedTag.subscribe((res) => {
      this.selectedTag = res;
      this.selectedTagId = res.tagId;
      this.selectedTagName = res.tagName;
      this.getlinkedFiles(this.selectedTagId);
    });

    this.filesService.selectedFiles.subscribe(() => {
      console.log('Called');
      this.getlinkedFiles(this.selectedTagId);
    });
  }

  getlinkedFiles(tagId: string) {
    this.isLoading = true;
    this.filesService.getTagDocs(tagId).subscribe((res: any) => {
      this.files = res;
      this.isLoading = false;
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

  unlinkFile(file: File): void {
    this.file = file;
    this.showDeletePopup = true;
  }

  confirmUnlinkFile(): void {
    this.isLoading = true;
    this.showDeletePopup = false;
    if (this.selectedTag) {
      const data = {
        externalIds: [this.file?.externalId],
        tags: [
          {
            tagId: this.selectedTag.tagId
          }
        ]
      };
      this.files = [];
      this.filesService.removeDocFromTag(data).subscribe((value: any) => {
        this.files = value;
        this.getlinkedFiles(this.selectedTagId);
        this.isLoading = false;
      });
    }
  }
}
