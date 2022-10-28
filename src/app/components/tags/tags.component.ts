import { Component, OnInit, ViewChild } from '@angular/core';
import { Tags } from '../../interfaces/tags';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { messages } from 'src/app/shared/messages';
import { constants } from 'src/app/shared/constants';
import { TagsService } from 'src/app/services/tags.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  readonly messages = messages;
  readonly constants = constants;
  mainActionMenu = new Array<MenuItem>();
  selectedTag: Tags | null = null;
  tags = new Array<Tags>();
  showNewTagPopup = false;
  isLoading = false;
  showEditTagPopup = false;
  showDeleteTagPopup = false;
  tagForm: FormGroup;
  selectedTagName = '';
  selectedTagId = '';
  tagsSubscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationService: ConfirmationService,
    private readonly tagsService: TagsService
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

  globalFilter($event: Event): void {
    if (this.dt) {
      this.dt.filterGlobal(
        ($event.target as HTMLInputElement).value,
        'contains'
      );
    }
  }

  getTags(): void {
    this.tagsService.getTags().subscribe((res: any) => {
      this.tags = res;
    });
  }

  selectTag(tag: Tags): void {
    this.tagsService.updateSelectedTag(tag);
  }

  addTag(): void {
    this.showNewTagPopup = true;
    this.tagForm.reset();
    this.getTagName.patchValue('');
  }

  createTag(): void {
    this.showNewTagPopup = false;
    this.isLoading = true;
    const name: string = this.getTagName.value;
    if (name.length >= this.constants.tagNameMinLength) {
      this.tagsService.createTag(name).subscribe(() => {
        this.getTags();
        this.isLoading = false;
      });
    }
  }

  editTag(tagId: string, tagName: string): void {
    this.showEditTagPopup = true;
    this.getTagId.patchValue(tagId);
    this.getTagName.patchValue(tagName);
  }

  updateTag(): void {
    this.isLoading = true;
    this.showEditTagPopup = false;
    const name: string = this.getTagName.value;
    if (name.length >= this.constants.tagNameMinLength) {
      this.showEditTagPopup = false;
      const tags = {} as Tags;
      tags.tagId = this.getTagId.value;
      tags.tagName = name;
      this.tagsService.updateTag(tags).subscribe(() => {
        this.getTags();
        this.isLoading = false;
      });
    }
  }

  deleteTag(tagId: string, tagName: string) {
    this.selectedTagName = tagName;
    this.selectedTagId = tagId;
    this.showDeleteTagPopup = true;
  }

  confirmDeleteTag(): void {
    this.isLoading = true;
    this.showDeleteTagPopup = false;
    this.tagsService.deleteTag(this.selectedTagId).subscribe(() => {
      this.getTags();
      this.isLoading = false;
    });
  }
}
