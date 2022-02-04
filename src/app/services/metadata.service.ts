import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { JwtHttp } from 'angular2-jwt-refresh';


@Injectable()
export class MetadataService {

  constructor(
    public metadataAPI: string,
    public http: Http,
    private jwtHttp: JwtHttp
  ) {}

  public getTree(): any {
    return this.jwtHttp
      .get(this.metadataAPI)
      .map(res => res.json())
      .map((res) => {
        if (res) {

        }

        return res;
      });
  }

  public addNode(node: any): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify({
      'name':                   node.name,
      'parentId':               node.parentId
    });

    return this.jwtHttp
      .post(
        this.metadataAPI,
        payload,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {

        }

        return res;
      })
      .flatMap(res => {
          return this.jwtHttp.get(this.metadataAPI)
            .map(res => res.json());
        }
      );
  }

  public updateNode(node: any): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let payload = JSON.stringify({
      'nodeId':                 node.nodeId,
      'name':                   node.name,
      'parentId':               node.parentId
    });

    return this.jwtHttp
      .put(
        this.metadataAPI,
        payload,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {

        }

        return res;
      })
      .flatMap(res => {
          return this.jwtHttp.get(this.metadataAPI)
            .map(res => res.json());
        }
      );
  }

  public deleteNode(nodeId: string): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let deleteURL = this.metadataAPI + '/' + nodeId;

    return this.jwtHttp.delete(deleteURL)
      .map(res => res.json())
      .map((res) => {
        if (res) {

        }

        return res;
      })
      .flatMap(res => {
          return this.jwtHttp.get(this.metadataAPI)
            .map(res => res.json());
        }
      );
  }

  public getFilesForMetadata(nodeId: string): any {

    return this.jwtHttp
      .get(this.metadataAPI + '/' + nodeId)
      .map(res => res.json())
      .map((res) => {
        if (res) {

        }

        return res;
      })
  }
}
