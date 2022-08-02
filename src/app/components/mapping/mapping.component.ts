import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Tags } from '../../interfaces/tags';
import { getSelectedTag } from '../../redux/selectors/tags.selectors';
import { fileDropped } from '../../redux/actions/app.actions';
import { File } from '../../interfaces/file';
import { FilesService } from '../../services/files.service';
import { messages } from '../../shared/messages';
import { Table } from 'primeng/table';
import { constants } from '../../shared/constants';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;
  readonly messages = messages;
  readonly constants = constants;
  selectedTag: Tags | null = null;
  selectedTagSubscription = new Subscription();
  dropped = new Array<any>();
  files = new Array<File>();
  selectedFiles = new Array<File>();
  constructor(
    private readonly store: Store,
    private readonly filesService: FilesService,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.selectedTagSubscription = this.store.select(getSelectedTag).subscribe({
      next: (value) => {
        this.selectedTag = value;
        this.updateFiles(this.selectedTag?.tagId);
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedTagSubscription.unsubscribe();
  }

  drop(): void {
    this.store.dispatch(fileDropped({ data: true }));
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
    if (this.selectedTag) {
      const data = {
        externalIds: [file.externalId],
        tags: [
          {
            tagId: this.selectedTag.tagId
          }
        ]
      };
      this.files = [];
      this.filesService.removeDocFromTag(data).subscribe({
        next: (value: any) => {
          this.files = value;
        }
      });
    }
  }

  private updateFiles(tagId: any): void {
    this.files = [];
    this.filesService.getTagDocs(tagId).subscribe({
      next: (value: any) => {
        this.files = value;
      }
    });
  }
}
