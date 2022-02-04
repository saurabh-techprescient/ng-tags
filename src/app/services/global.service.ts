/**
 * Created by adriangillette on 12/19/16.
 */

import {Injectable, Inject} from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class GlobalService {

  // Observable string sources
  private globalOrCompanyselectedSource: Subject<string> = new Subject<any>();
  public selectedDocs: Subject<string> = new Subject<any>();
  public tagId: Subject<string> = new Subject<any>();
  public tagDocs: Subject<any> = new Subject<any>();
  private userRoleLoggedIn:Subject<string> = new Subject<string>();

  // Observable string streams
  public globalOrCompanyselected: Observable<string> = this.globalOrCompanyselectedSource.asObservable();
  public selectedCompany: string = null;
  public userGlobal:string = null;

  constructor() {

  }

  public getTagId() {
    return this.tagId;
  }
  public setTagId(value)
  {
    this.tagId.next(value);
  }
  public getSelectedDocs() {
    console.log("2", this.selectedDocs);
    return this.selectedDocs;
  }
  public setSelectedDocs(value) {
    console.log("1", value);
    this.selectedDocs.next(value);
  }
  public getTagDocs() {
    return this.tagDocs;
  }
  public setTagDocs(value)
  {
    this.tagDocs.next(value);
  }
}

