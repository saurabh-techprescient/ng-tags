/**
 * Created by adriangillette on 12/19/16.
 */

import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { JwtHttp } from 'angular2-jwt-refresh';

@Injectable()

export class TagsService {
  public usernameExtension: string;
  public docs: any[] = null;
  constructor(
    public baseAPI: string,
    public tagsAPI: string,
    public http: Http,
    public jwtHttp: JwtHttp
  ) { }

  public getTags(refresh: boolean = false): any {
    return this.jwtHttp
      .get(this.tagsAPI + '/contentitemtag')
      .map((res) => res.json())
      .map((res) => {
        if (res && !res.errorcode) {
          this.docs = res;
        }
        return res;
      });
  }

  public getDocs(refresh: boolean = false): any {
    return this.jwtHttp
      .get(this.tagsAPI + '/partnerportalnode')
      .map((res) => res.json())
      .map((res) => {
        if (res && !res.errorcode) {
          this.docs = res;
        }
        return res;
      });
  }

  public getTagDocs(tagId): any {
    return this.jwtHttp
      .get(this.tagsAPI + '/contentitemtag/' + tagId)
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }

  public addTag(tag: any): any {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let payload = JSON.stringify({
    //   tagName: tag,
    // });
    // var options = new RequestOptions({
    //   headers: headers
    // });
    // return this.jwtHttp
    //   .post(
    //     this.tagsAPI + '/contentitemtag/',
    //     payload,
    //     options
    //   )
    //   .map((res) => res.json())
    //   .map((res) => {
    //     return res;
    //   });

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let payload = JSON.stringify({
      tagName: tag
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.jwtHttp
      .post(
        this.tagsAPI + '/contentitemtag/',
        payload,
        options
      )
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }

  public updateTag(tag: any): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let payload = JSON.stringify({
      tagIndex: tag.tagIndex,
      tagName: tag.tagName,
      tagId: tag.tagId
    });

    var options = new RequestOptions({
      headers: headers
    });

    return this.jwtHttp
      .put(
        this.tagsAPI + '/contentitemtag/',
        payload,
        options
      )
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }

  public deleteTag(tagId): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var options = new RequestOptions({
      headers: headers
    });
    return this.jwtHttp
      .delete(
        this.tagsAPI + '/contentitemtag/' + tagId,
        options
      )
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }

  removeDocFromTag(data: any): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let payload = data;
    var options = new RequestOptions({
      headers: headers
    });
    return this.jwtHttp
      .put(
        this.tagsAPI + '/contentitemtag/updatecontentitemtag',
        payload,
        options
      )
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }

  addDocsToTag(data: any): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let payload = data;
    var options = new RequestOptions({
      headers: headers
    });
    return this.jwtHttp
      .put(
        this.tagsAPI + '/contentitemtag/updatecontentstag/',
        payload,
        options
      )
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }

  public getUser(userId: string): any {
    return this.jwtHttp
      .get(this.tagsAPI + '/' + userId)
      .map((res) => res.json())
      .map((res) => {
        return res;
      });
  }
}