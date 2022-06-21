import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../interfaces/tags';
import { ConfirmationService, MenuItem } from 'primeng/api';
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
  loadSelectedTag,
  updateTag
} from '../../redux/actions/tags.actions';
import { Subscription } from 'rxjs';
import { getAllTags } from '../../redux/selectors/tags.selectors';
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
  selectedTag: Tags | null = null;
  tags = new Array<Tags>();
  showNewTagPopup = false;
  showEditTagPopup = false;
  tagForm: FormGroup;
  tagsSubscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationService: ConfirmationService,
    private readonly store: Store
  ) {
    this.tagForm = this.fb.group({
      tagId: [],
      tagName: ['', Validators.required]
    });
  }

  get getTagId(): FormControl {
    return this.tagForm.controls['tagId'] as FormControl;
  }

  get getTagName(): FormControl {
    return this.tagForm.controls['tagName'] as FormControl;
  }

  ngOnInit(): void {
    this.getTags();
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

  getTags(): void {
    this.tagsSubscription = this.store.select(getAllTags).subscribe({
      next: (tags: Array<Tags> | null) => {
        if (tags) {
          this.tags = [...tags];
        }
      }
    });
  }

  selectTag(tag: Tags): void {
    this.store.dispatch(loadSelectedTag({ tags: tag }));
  }

  tagUnselect(): void {
    this.selectedTag = null;
    this.store.dispatch(loadSelectedTag({ tags: null }));
  }

  addTag(): void {
    this.tagUnselect();
    this.showNewTagPopup = true;
    this.tagForm.reset();
    this.getTagName.patchValue('');
  }

  createTag(): void {
    const name: string = this.getTagName.value;
    if (name.length >= this.constants.tagNameMinLength) {
      this.showNewTagPopup = false;
      const tags = {} as Tags;
      tags.tagName = name;
      this.store.dispatch(createTag({ tags }));
    }
  }

  editTag(tagId: string, tagName: string): void {
    this.showEditTagPopup = true;
    this.getTagId.patchValue(tagId);
    this.getTagName.patchValue(tagName);
  }

  updateTag(): void {
    const name: string = this.getTagName.value;
    if (name.length >= this.constants.tagNameMinLength) {
      this.showEditTagPopup = false;
      const tags = {} as Tags;
      tags.tagId = this.getTagId.value;
      tags.tagName = name;
      this.store.dispatch(updateTag({ tags }));
    }
  }

  deleteTag(tagId: string, tagName: string): void {
    this.confirmationService.confirm({
      message: tagName,
      header: this.messages.tagsTable.deleteMetadata.header,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(deleteTag({ data: tagId }));
        this.selectedTag = null;
        this.getTags();
      }
    });
  }
}
