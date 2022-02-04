/**
 * Created by adriangillette on 1/20/17.
 */

import { Pipe, PipeTransform } from '@angular/core';



@Pipe({name: 'contentType'})
export class ContentTypePipe implements PipeTransform {

  private friendlyName: any = {
    filedepot_folder: 'file depot folder',
    homepage: 'homepage',
    article: 'article',
    error_page: 'error page',
    overview: 'overview',
    full_width: 'full width',
    forum: 'forum',
    page: 'page',
    one_col_right: '1 column right',
    file: 'file'
  }

  transform(value) : any {

    return this.friendlyName[value];
  }
}
