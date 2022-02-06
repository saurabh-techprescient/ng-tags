/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TagsService } from '../../../services/tags.service';
import { GlobalService } from '../../../services/global.service';
import { interval } from 'rxjs/observable/interval';
@Component({
  selector: 'persona-tags',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'persona-tags.component.html'
})
export class PersonaTagsComponent implements OnInit {
  public busy: Subscription;
  public docIds: any = {};
  private _tagedDocs: any = null;
  private _selectedTagId: any = null;
  public docsList: any = null;
  public docsListOrg: any = null;
  public selectedCompanyId: string = '';
  public filterStatus = false;
  public selectedDocs: Array<any> = [];
  public personaId: string = '';
  settings = {
    hideSubHeader: this.filterStatus,
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'unlinkDocs', title: '&nbsp;&nbsp;<i class="fa fa-trash"></i>' }
      ],
      position: 'right'
    },
    columns: {
      name: {
        title: 'Name',
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
      },
    },
    attr: {
      class: 'table table-bordered table-striped'
    }
  };

  @Input() public resultGridList: Array<any> = [];

  @Input()
  set tagedDocs(value: any) {
    this._tagedDocs = value;
    if (value) {
      this.docIds = {};
      if (this._tagedDocs === null) {
        this._tagedDocs = [];
      }
      for (let doc of this._tagedDocs) {
        this.docIds[doc.externalId] = true;
      }
      this.docsList = this._tagedDocs;
      this.docsListOrg = this._tagedDocs;
    }
  }
  get tagedDocs(): any {
    return this._tagedDocs;
  }

  @Input()
  set selectedTagId(value: any) {
    this._selectedTagId = value;
  }
  get selectedTagId(): any {
    return this._selectedTagId;
  }

  constructor(
    private tagsService: TagsService,
    private globalService: GlobalService
  ) {
  }

  public ngOnInit() {
    // if (this.tagedDocs) {
    //   this.selectedDocs = [];
    //   this.globalService.selectedDocs.subscribe(res => {
    //     console.log("res", res);
    //     if (res.length > 0) {
    //       this.addDocs();
    //     }
    //   });
    // }

    console.log("1");
    console.log("a");
    this.selectedDocs = [];
    this.globalService.selectedDocs.subscribe(res => {
      if (res.length > 0) {
        console.log("res- ",res);
        this.addDocs(res);
      }
    });
  }

  public addDocs(res) {
    console.log("res1", res);
    let data = {
      externalIds: this.selectedDocs,
      tags: [
        {
          tagId: this.selectedTagId
        }
      ]
    }
    this.busy = this.tagsService
      .addDocsToTag(data)
      .subscribe(res => {
        if (!res.errorCode) {
          let docs: Array<any> = [];
          this.docIds = {};
          for (let doc of res) {
            console.log("doc", doc);
            if (!this.docIds.hasOwnProperty(doc.externalId)) {
              docs.push(doc);
              this.docIds[doc.externalId] = true;
            }
          }
          res = docs;
          this.tagedDocs = res;
        }
      });
    let emptyUsers = [];
    this.globalService.setSelectedDocs(emptyUsers);
    this.getTagDocs();
  }

  public removeDoc(event: any) {
    let tags: any[] = [];
    event.data.tags.forEach(tag => {
      if (tag.tagId !== this.selectedTagId) {
        tags.push(tag);
      }
    })
    let data = {
      "externalIds": [
        event.data.externalId
      ],
      "tags": [
        {
          "tagId": this.selectedTagId
        },
      ]
    }
    this.busy = this.tagsService
      .removeDocFromTag(data)
      .subscribe(res => {
        this.getTagDocs();
      });
  }

  getTagDocs() {
    this.busy = this.tagsService.getTagDocs(this.selectedTagId)
      .subscribe((res) => {
        this.docsList = res;
        this.globalService.setTagId(this.selectedTagId);
        this.globalService.setTagDocs(this.docsList);
      })
  }

  onSearch(value) {
    this.docsList = this.docsListOrg;
    this.docsList = this.docsList.filter(
      obj => obj.name.toUpperCase().includes(value.toUpperCase()),
    );
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */