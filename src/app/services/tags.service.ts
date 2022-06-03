import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tag } from '../interfaces/tag';

@Injectable()
export class TagsService {
  readonly windowData = (window as { [key: string]: any })[
    environment.settingsProperty
  ];
  readonly baseAPI = this.windowData
    ? this.windowData.ng_persona.baseAPI
    : 'http://localhost/itron';

  readonly tagsAPI = this.windowData
    ? this.windowData.ng_persona.tagsAPI
    : 'http://localhost/itron';

  public docs: any[] = [];
  constructor(public http: HttpClient) {}

  getTags = (): Observable<Array<Tag>> =>
    this.http.get<Array<Tag>>(`${this.tagsAPI}/contentitemtag`);

  public getDocs(): any {
    return this.http.get<any>(`${this.tagsAPI}/partnerportalnode`);
  }

  public getTagDocs(tagId: string): any {
    return this.http.get<any>(`${this.tagsAPI}/contentitemtag${tagId}`);
  }

  addTag(tag: any): Observable<Tag> {
    const payload = JSON.stringify({
      tagName: tag
    });
    return this.http.post<Tag>(`${this.baseAPI}contentstag/${tag}`, payload);
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
