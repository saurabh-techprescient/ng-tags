import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { getSelectedNode } from '../../redux/selectors/tags.selectors';
import { fileDropped } from '../../redux/actions/app.actions';
import { File } from '../../interfaces/file';
import { messages } from '../../shared/messages';
import { Table } from 'primeng/table';
import { unlinkFile } from '../../redux/actions/file.actions';
import { constants } from '../../shared/constants';

@Component({
  selector: 'app-selected-metadata',
  templateUrl: './selected-metadata.component.html',
  styleUrls: ['./selected-metadata.component.scss']
})
export class SelectedMetadataComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;
  readonly messages = messages;
  readonly constants = constants;
  selectedNode: TreeNode | null = null;
  selectedNodeSubscription = new Subscription();
  dropped = new Array<any>();
  files = new Array<File>();
  selectedFiles = new Array<File>();
  constructor(
    private readonly store: Store,
    private readonly confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.selectedNodeSubscription = this.store
      .select(getSelectedNode)
      .subscribe({
        next: (value) => {
          this.selectedNode = value;
          this.updateFiles();
        }
      });
  }

  ngOnDestroy(): void {
    this.selectedNodeSubscription.unsubscribe();
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
    if (this.selectedNode) {
      this.confirmationService.confirm({
        message: file.name,
        header: this.messages.selectedNode.unlinkFile.header,
        icon: 'pi pi-exclamation-triangle',
        accept: () =>
          this.store.dispatch(
            unlinkFile({
              data: {
                metadataId: this.selectedNode?.data.nodeId,
                files: [file.fileId]
              }
            })
          )
      });
    }
  }

  unlinkSelectedFiles(): void {
    if (this.selectedNode) {
      this.confirmationService.confirm({
        message: this.messages.selectedNode.unlinkFile.title,
        header: this.messages.selectedNode.unlinkFile.header,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const files = new Array<string>();
          this.selectedFiles.forEach((file) => files.push(file.fileId));
          this.store.dispatch(
            unlinkFile({
              data: {
                metadataId: this.selectedNode?.data.nodeId,
                files
              }
            })
          );
          this.selectedFiles = [];
        }
      });
    }
  }

  private updateFiles(): void {
    this.files = [];
    if (this.selectedNode && this.selectedNode.data) {
      this.files = [...this.selectedNode.data.files];
    }
  }
}
