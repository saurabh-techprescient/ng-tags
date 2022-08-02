import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  public docs: any[] = [];
  constructor(public http: HttpClient) {}

  getDocs = (): Observable<Array<File>> =>
    this.http.get<Array<File>>(`${this.tagsAPI}/partnerportalnode`);

  public getTagDocs(tagId: string): any {
    return this.http.get<any>(`${this.tagsAPI}/contentitemtag/${tagId}`);
  }

  addTag(tag: any): Observable<any> {
    const payload = JSON.stringify({
      tagName: tag
    });
    return this.http.post<any>(`${this.baseAPI}contentstag/${tag}`, payload);
  }

  updateTag(tag: any): Observable<any> {
    const payload = JSON.stringify({
      tagIndex: tag.tagIndex,
      tagName: tag.tagName,
      tagId: tag.tagId
    });
    return this.http.put<any>(`${this.tagsAPI}/contentitemtag/`, payload);
  }

  deleteTag(tagId: string): Observable<any> {
    return this.http.delete<any>(`${this.tagsAPI}/contentitemtag/${tagId}`);
  }

  removeDocFromTag(data: any): Observable<any> {
    return this.http.put<any>(
      `${this.tagsAPI}/contentitemtag/updatecontentitemtag`,
      data
    );
  }

  addDocsToTag(data: any): Observable<any> {
    return this.http.put<any>(
      `${this.tagsAPI}/contentitemtag/updatecontentitemtag`,
      data
    );
  }

  public getUser(userId: string): any {
    return this.http.get<any>(`${this.tagsAPI}/${userId}`);
  }
}
