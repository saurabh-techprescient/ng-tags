import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { File } from '../interfaces/file';

@Injectable()
export class FilesService {
  readonly windowData = (window as { [key: string]: any })[
    environment.settingsProperty
  ];
  readonly baseAPI = this.windowData
    ? this.windowData.ng_tags.baseAPI
    : 'http://localhost/itron';

  readonly tagsAPI = this.windowData
    ? this.windowData.ng_tags.tagsAPI
    : 'http://localhost/itron';

  selectedFiles: Subject<string[]> = new Subject<any>();
  selectedFileDetails: Observable<string[]> = this.selectedFiles.asObservable();

  public docs: any[] = [];
  constructor(public http: HttpClient) {}

  updateSelectedFiles(files: string[]) {
    this.selectedFiles.next(files);
  }

  getDocs(): any {
    return this.http.get<Array<File>>(`${this.tagsAPI}/partnerportalnode`);
  }

  getTagDocs(tagId: string): any {
    return this.http.get<any>(`${this.tagsAPI}/contentitemtag/${tagId}`);
  }

  removeDocFromTag(data: any): Observable<any> {
    return this.http.put<any>(
      `${this.tagsAPI}/contentitemtag/updatecontentitemtag`,
      data
    );
  }

  addDocsToTag(data: any): Observable<any> {
    return this.http.put<any>(
      `${this.tagsAPI}/contentitemtag/updatecontentstag`,
      data
    );
  }

  public getUser(userId: string): any {
    return this.http.get<any>(`${this.tagsAPI}/${userId}`);
  }
}
