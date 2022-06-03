import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class GlobalService {
  public selectedDocs: Subject<string> = new Subject<any>();
  public tagId: Subject<string> = new Subject<any>();
  public tagDocs: Subject<any> = new Subject<any>();
  public globalOrCompanyselectedSource: Subject<string> = new Subject<any>();
  public globalOrCompanyselected: Observable<string> =
    this.globalOrCompanyselectedSource.asObservable();
  public selectedCompany = '';
  public userGlobal = '';
  private userRoleLoggedIn: Subject<string> = new Subject<string>();
  constructor() {}
  public getTagId() {
    return this.tagId;
  }
  public setTagId(value: string) {
    this.tagId.next(value);
  }
  public getSelectedDocs() {
    return this.selectedDocs;
  }
  public setSelectedDocs(value: string) {
    this.selectedDocs.next(value);
  }
  public getTagDocs() {
    return this.tagDocs;
  }
  public setTagDocs(value: string) {
    this.tagDocs.next(value);
  }
}
