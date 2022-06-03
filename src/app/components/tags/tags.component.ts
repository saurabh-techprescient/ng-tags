import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../interfaces/tags';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/api';
import { messages } from 'src/app/shared/messages';
import { constants } from 'src/app/shared/constants';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  createTag,
  deleteTag,
  loadSelectedTag
} from '../../redux/actions/tags.actions';
import { Subscription } from 'rxjs';
import { getAllTags } from '../../redux/selectors/tags.selectors';
import { Tag } from 'src/app/interfaces/tag';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt: Table | undefined;
  readonly messages = messages;
  readonly constants = constants;
  mainActionMenu = new Array<MenuItem>();
  selectedTag: TreeNode | null = null;
  tags = new Array<any>();
  newTag = false;
  tagForm: FormGroup;
  tagsSubscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationService: ConfirmationService,
    private readonly store: Store
  ) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  get getName(): FormControl {
    return this.tagForm.controls['name'] as FormControl;
  }

  ngOnInit(): void {
    this.tagsSubscription = this.store.select(getAllTags).subscribe({
      next: (tags: Array<Tags> | null) => {
        if (tags) {
          this.tags = tags;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.tagsSubscription.unsubscribe();
  }

  globalFilter($event: Event): void {
    if (this.dt) {
      this.dt.filterGlobal(
        ($event.target as HTMLInputElement).value,
        'contains'
      );
    }
  }

  tagSelect($event: TreeNode): void {
    this.store.dispatch(loadSelectedTag({ data: $event }));
  }

  tagUnselect(): void {
    this.selectedTag = null;
    this.store.dispatch(loadSelectedTag({ data: null }));
  }

  addTag(): void {
    this.tagUnselect();
    this.openNewTagPopup();
  }

  openNewTagPopup(): void {
    this.newTag = true;
    this.tagForm.reset();
    this.getName.patchValue('');
  }

  createTag(): void {
    const name: string = this.getName.value;
    if (name.length <= this.constants.tagNameMinLength) {
      this.newTag = false;
      const tags = {} as Tag;
      tags.tagName = name;
      this.store.dispatch(createTag({ data: tags }));
    }
  }

  deleteTag(): void {
    if (this.selectedTag) {
      this.confirmationService.confirm({
        message: this.selectedTag ? this.selectedTag.label : '',
        header: this.messages.tagsTable.deleteMetadata.header,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(
            deleteTag({ data: this.selectedTag?.data.nodeId })
          );
          this.selectedTag = null;
        }
      });
    }
  }
}
