/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Input
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { TagsService } from '../../services/tags.service';
import { GlobalService } from '../../services/global.service';
import * as _ from 'lodash';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'tags',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'tags.component.html'
})
export class UsersComponent implements OnInit {
  public busy: Subscription;
  public filteredDocs: Array<any> = [];
  public companies: Array<string> = [];
  public companiesHash: any = {};
  public _tagedDocs: Array<any> = [];
  private _selectedTagId: any = null;
  private _selectedTagName: any = null;
  public companIdHash: any = {};
  public searchTerm: string = '';
  public selectedCompany: string = '';
  public selectedCompanyId: string = '';
  public isGlobal: boolean = true;
  private searchTextChanged = new Subject();
  private userRole: string = null;
  private selectedRows: Array<any> = [];
  private selectedDocs: Array<any> = [];
  public docs: Array<string> = [];
  public tagDocs: Array<string> = [];

  @ViewChild('companySelector') companySelector: any;

  @Input()
  set tagedDocs(value: any) {
    this._tagedDocs = value;
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

  @Input()
  set selectedTagName(value: any) {
    this._selectedTagName = value;
  }
  get selectedTagName(): any {
    return this._selectedTagName;
  }

  constructor(
    private tagsService: TagsService,
    private globalService: GlobalService,
  ) {

    this.searchTextChanged.asObservable()
      .debounceTime(1000)
      .subscribe((list: string) => {
        this.getAllDocs();
      },
        (error) => {
          console.log("error");
        },
        () => {
          console.log("Calling from inside complete");
        }
      );
  }

  public filterStatus = false;
  settings = {
    selectMode: 'multi',
    hideSubHeader: this.filterStatus,
    actions: false,
    rowClassFunction: (row) => {
      let extId = row.data.externalId;
      if (this.checkRow(extId)) {
        return '';
      } else {
        return 'hide-action';
      }
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
      }
    },
    attr: {
      class: 'table table-bordered table-striped'
    }
  };
  public async ngOnInit() {
    this.globalService.tagDocs.subscribe((res) => {
      this.tagDocs = [];
      for (let usr of res) {
        this.tagDocs.push(usr.externalUserId);
      }
    });
    this.userRole = this.globalService.userGlobal;
    this.globalService.globalOrCompanyselected
      .subscribe((res) => {
        this.isGlobal = (res === 'global') ? true : false;
        this.userRole = this.globalService.userGlobal;
      });
    await this.getAllDocs();
  }

  checkRow(extId) {
    let a = this.docs.indexOf(this.selectedTagId);
    let obj = {};
    if (this.tagedDocs) {
      this.tagedDocs.forEach(function (a) {
        if (a.externalId === extId) {
          console.log("Here", a.externalId, extId);
          return false;
        }
      });
      return true;
    }
  }

  public getAllDocs(): any {
    this.busy = this.tagsService.getDocs()
      .subscribe((res) => {
        this.filteredDocs = res;
      });
  }

  public filterDocs(searchTerm: string): any {
    this.applyFilter(this.selectedCompany, searchTerm);
  }

  public filterUsersForCompanyAdmin(searchTerm: string, keyCode: any) {
    if (keyCode === 13) {
      this.applyFilterForCompanyAdmin(searchTerm);
    }
  }

  public applyFilterForCompanyAdmin(searchTerm: string) {
    this.searchTerm = searchTerm.trim().toLocaleLowerCase();
    this.searchTextChanged.next(searchTerm);
  }

  private applyFilter(company: string, searchTerm: string) {
    if (searchTerm === '' || searchTerm.length == 0 || searchTerm.length >= 3) {
      this.searchTerm = searchTerm.toLowerCase().trim();
      this.searchTextChanged.next(searchTerm);
    }
  }

  onUserRowSelect(event) {
    this.selectedRows = event.selected;
  }

  addToTag() {
    this.selectedDocs = [];
    for (let sl of this.selectedRows) {
      this.selectedDocs.push(sl.externalId);
      this.tagDocs.push(sl.externalId);
    }
    this.globalService.setSelectedDocs(this.selectedDocs);
    //this.getAllDocs();
  }
}
