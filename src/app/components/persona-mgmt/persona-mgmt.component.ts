/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TagsService } from '../../services/tags.service';
import { GlobalService } from '../../services/global.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'persona-mgmt',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'persona-mgmt.component.html'
})
export class PersonaMgmtComponent implements OnInit {

  @ViewChild('personaPopup') pop: any;

  public busy: Subscription;

  public radioModel: string = 'Users';
  public newTagName: string = '';
  public tags: any[] = [];
  public tagedDocs: any = null;
  public selectedTagId: string;
  public selectedTagName: string = "Please Select A Tag";
  public isShowNewTag: boolean = false;
  public tagDocs: Array<any> = [];
  public selectedCompanyId: string = null;
  public selectedNodeRole: any;
  public tagsHash: any = {};
  public hasTagName: boolean = false;

  constructor(
    private tagsService: TagsService,
    private globalService: GlobalService
  ) {
  }

  public filterStatus = false;
  settings = {
    hideSubHeader: this.filterStatus,
    actions: {
      columnTitle: '',
      add: false,
      edit: true,
      delete: true,
      position: 'right'
    },
    edit: {
      editButtonContent: '<i class="fa fa-pencil"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '&nbsp;&nbsp;<i class="fa fa-trash"></i>',
      confirmDelete: true
    },
    columns: {
      tagName: {
        title: 'Tag',
        compareFunction: (direction: any, a: any, b: any) => {
          // Converting strings to lowercase
          let first = typeof a === 'string' ? a.toLowerCase() : a;
          let second = typeof b === 'string' ? b.toLowerCase() : b;
          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      }
    },
    attr: {
      class: 'table table-bordered table-striped'
    }
  };

  public ngOnInit() {
    this.getTags();
  }

  public getTags() {
    this.busy = this.tagsService.getTags()
      .subscribe((res) => {
        this.tags = res;
        this.tagsHash = {};
        for (let tag of this.tags) {
          this.tagsHash[tag.tagId] = tag;
        }
        return this.tags;
      });
  }

  updateRecord(event) {
    var data = {
      "tagIndex": event.data.tagIndex,
      "tagName": event.data.tagName,
      "age": event.data.tagId
    };
  }


  onDeleteConfirm(event) {
    this.busy = this.tagsService.deleteTag(event.data.tagId)
      .subscribe((res) => {
        location.reload();
      });
  }

  onEditConfirm(event) {
    if (event.newData.tagName !== "") {
      var data = {
        tagIndex: event.newData.tagIndex,
        tagName: event.newData.tagName,
        tagId: event.newData.tagId
      };
      this.busy = this.tagsService.updateTag(data)
        .subscribe((res) => {
          location.reload();
        });
    }
  }

  public showNewTag() {
    this.pop.show();
  }

  addTag() {
    this.busy = this.tagsService.addTag(this.newTagName)
      .subscribe((res) => {
        this.getTags();
      });
    location.reload();
  }

  public cancelAddTag(): void {
    this.newTagName = '';
    this.isShowNewTag = false;
    this.pop.hide();
  }

  public clickOutsideNewTag() {
    if (this.isShowNewTag) {
      this.cancelAddTag();
    } else {
      this.isShowNewTag = true;
    }
  }

  public onTagSelect($event) {
    this.selectedTagId = $event.data.tagId;
    this.selectedTagName = $event.data.tagName;
    this.selectedNodeRole = null;
    this.busy = this.tagsService.getTagDocs(this.selectedTagId)
      .subscribe((res) => {
        if (res.personaUsers === null) {
          res.personaUsers = [];
        }
        this.tagedDocs = res;
        this.globalService.setTagId($event.data.tagId);
        this.tagDocs = [];
        for (let tagDocs of this.tagedDocs) {
          this.tagDocs.push(tagDocs.externalId);
        }
        this.globalService.setTagDocs(this.tagedDocs);
      });
  }

  public onSelectNode(nodeRole: any) {
    this.selectedNodeRole = nodeRole;
  }

  public onTagsSelect($event: any) {
    this.selectedTagId = $event.data.tagId;
    this.selectedTagName = $event.data.tagName;
    this.selectedNodeRole = null;
    this.busy = this.tagsService.getTagDocs(this.selectedTagId)
      .subscribe((res) => {
        this.tagedDocs = res;
      });
  }

  checkTagName() {
    this.hasTagName = false;
    if (this.newTagName.replace(/\s/g, '').length) {
      this.hasTagName = true;
    }
  }
}


/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
